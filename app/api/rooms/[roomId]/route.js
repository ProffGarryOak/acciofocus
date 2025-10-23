// app/api/rooms/[roomID]/route.js
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import connectDB from '@/config/db';
import User from '@/models/user';

// ------------------- GET -------------------
export async function GET(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const roomID = params.roomId;
    console.log('Fetching details for roomID:', roomID);

    // Find all users who have this room in their studyRooms array
    const users = await User.find({ 'studyRooms.id': roomID });

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    let roomData = null;
    let members = [];

    for (const user of users) {
      const room = user.studyRooms.find(r => r.id === roomID);
      if (room) {
        // Use the first room data we find (they should all be synced)
        if (!roomData) {
          roomData = {
            id: room.id,
            name: room.name,
            description: room.description,
            category: room.category,
            maxParticipants: room.maxParticipants,
            participants: room.participants,
            isPrivate: room.isPrivate,
            privateKey: room.privateKey,
            createdBy: room.createdBy,
            createdAt: room.createdAt,
            lastActive: room.lastActive,
            totalSessions: room.totalSessions,
            favorite: room.favorite
          };
        }

        // Collect member info
        if (user.profile) {
          members.push({
            id: user.profile.id,
            name: user.profile.name,
            avatar: user.profile.avatar,
            lastActive: user.profile.lastActive,
            streak: user.profile.streak
          });
        }
      }
    }

    if (!roomData) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({
      room: roomData,
      members: members,
      memberCount: members.length
    });
  } catch (error) {
    console.error('Error fetching room details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room details', details: error.message },
      { status: 500 }
    );
  }
}

// ------------------- PATCH -------------------
export async function PATCH(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Await params in Next.js 15
    const { roomID } = params;
    const updates = await request.json();

    // Find the logged-in user
    const user = await User.findOne({ 'profile.id': userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const roomIndex = user.studyRooms?.findIndex(room => room.id === roomID);
    if (roomIndex === -1 || roomIndex === undefined) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const room = user.studyRooms[roomIndex];

    // Check if user is the room creator
    if (room.createdBy !== user.profile.id) {
      return NextResponse.json(
        { error: 'Only room creator can edit room' },
        { status: 403 }
      );
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'description', 'maxParticipants', 'category'];
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        room[field] = updates[field];
      }
    });
    room.lastActive = new Date();

    // Save the user's changes first
    await user.save();

    // Update the room in all other users who have joined it
    const otherUsers = await User.find({
      'studyRooms.id': roomID,
      'profile.id': { $ne: userId }
    });

    // Use Promise.all for better performance
    await Promise.all(
      otherUsers.map(async (otherUser) => {
        const otherRoomIndex = otherUser.studyRooms.findIndex(r => r.id === roomID);
        if (otherRoomIndex !== -1) {
          allowedUpdates.forEach(field => {
            if (updates[field] !== undefined) {
              otherUser.studyRooms[otherRoomIndex][field] = updates[field];
            }
          });
          otherUser.studyRooms[otherRoomIndex].lastActive = new Date();
          await otherUser.save();
        }
      })
    );

    return NextResponse.json({
      success: true,
      room: room,
      message: 'Room updated successfully'
    });
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json(
      { error: 'Failed to update room', details: error.message },
      { status: 500 }
    );
  }
}

// ------------------- DELETE -------------------
export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Await params in Next.js 15
    const { roomID } = params;

    // Find the logged-in user
    const user = await User.findOne({ 'profile.id': userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const roomIndex = user.studyRooms?.findIndex(room => room.id === roomID);
    if (roomIndex === -1 || roomIndex === undefined) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const room = user.studyRooms[roomIndex];

    // Check if user is the room creator
    if (room.createdBy !== user.profile.id) {
      return NextResponse.json(
        { error: 'Only room creator can delete room' },
        { status: 403 }
      );
    }

    // Remove room from creator's studyRooms
    user.studyRooms.splice(roomIndex, 1);
    await user.save();

    // Remove room from all other users
    await User.updateMany(
      { 'studyRooms.id': roomID },
      { $pull: { studyRooms: { id: roomID } } }
    );

    return NextResponse.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting room:', error);
    return NextResponse.json(
      { error: 'Failed to delete room', details: error.message },
      { status: 500 }
    );
  }
}