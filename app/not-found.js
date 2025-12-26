"use client";
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FaCompass, FaHome } from 'react-icons/fa';
import Image from 'next/image';

export default function NotFound() {
  const { isLoaded, isSignedIn } = useUser();
  const homeHref = isLoaded && isSignedIn ? '/dashboard' : '/';

    return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-green-500 to-white p-4">
      <div className="relative w-full">
        {/* 404 Text in Background */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="text-[10rem] md:text-[500px] font-black bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent -mt-24">404</div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Mascot */}
          <Image
            src="/lost.png"
            alt="Confused Mascot"
            width={288}
            height={288}
            className=""
          />

          {/* Text */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Looks like we lost you
            </h1>
            
            <p className="text-gray-500 text-lg mb-5">
              Let us take you to somewhere familiar
            </p>
            
            <Link
              href={homeHref}
              className="inline-block bg-gray-800 hover:bg-black text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
