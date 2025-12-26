"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { 
  FaHeart, 
  FaRocket, 
  FaLeaf, 
  FaLightbulb, 
  FaStar, 
  FaUsers,
  FaGithub,
  FaCoffee,
  FaRegSmile,
  FaPalette,
  FaBrain
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutPage() {
  const [mascotAnimation, setMascotAnimation] = useState('idle');
  
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: missionRef, inView: missionInView } = useInView({ threshold: 0.2 });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.2 });
  
  const features = [
    { icon: <FaBrain />, title: "Pomodoro Timer", desc: "Structured focus sessions" },
    { icon: <FaPalette />, title: "Ambient Audio", desc: "Calm soundscapes" },
    { icon: <FaUsers />, title: "Study Rooms", desc: "Collaborative sessions" },
    { icon: <FaRegSmile />, title: "Joyful UX", desc: "Pleasant interactions" },
  ];

  const values = [
    {
      title: "Calm Over Chaos",
      desc: "Design that reduces anxiety and promotes focus",
      color: "from-green-400 to-cyan-300",
      icon: <FaLeaf />
    },
    {
      title: "Human-Centered",
      desc: "Built with empathy and real user needs in mind",
      color: "from-purple-400 to-pink-300",
      icon: <FaHeart />
    },
    {
      title: "Continuous Growth",
      desc: "Always learning, always improving",
      color: "from-amber-400 to-orange-300",
      icon: <FaRocket />
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 text-gray-900">
      <Navbar />
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative overflow-hidden pt-20 px-6 md:px-12 lg:px-24"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-purple-100/20"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-green-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gradient-to-r from-green-100 to-purple-100 rounded-full">
              <FaStar className="text-yellow-500" />
              <span className="text-sm font-medium text-green-700">Personal Project</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              About AccioFocus
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Where focus meets <span className="font-semibold text-green-600">joy</span>, and productivity finds its <span className="font-semibold text-green-600">calm</span>.
            </p>
          </motion.div>

          {/* Hero Content with Mascot */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: heroInView ? 1 : 0, x: heroInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 md:w-1/2 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                <FaCoffee className="text-amber-600" />
                <span className="text-sm font-medium text-green-800">Brewed with curiosity</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                More than just a focus app
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                AccioFocus started as a tiny experiment — a way to combine gentle design and proven focus techniques into a place <span className="font-semibold text-green-600">I actually wanted to use</span>. It grew out of late-night study sessions, messy to-do lists, and the search for a smarter, friendlier environment for getting things done.
                
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4 justify-center md:justify-start">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100"
                  >
                    <span className="text-green-500">{feature.icon}</span>
                    <span className="font-medium text-gray-700">{feature.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mascot Section */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <Image
                src="/mascot.png"
                alt="AccioFocus Mascot"
                width={500}
                height={500}
                className="w-full max-w-sm md:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={missionRef}
        className="py-10 px-6 md:px-12 lg:px-24"
      >
        <div className="mx-auto">
          
<div className="flex flex-col-reverse md:flex-row justify-between items-center">
                <Image
                src="/builder.png"
                alt="Our Mission Illustration"
                width={200}
                height={100}
                className="w-full h-auto"
            />
          <div className="flex w-full flex-col gap-8">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: missionInView ? 1 : 0, y: missionInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-right mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Why</span> I built it?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               I love the idea that our tools should help us do our best work without being loud or distracting. So I
            focused on three things: clarity of purpose, pleasant sensory ambience (soft backgrounds & ambient sound),
            and interactions that feel reliable and delightful. AccioFocus is the result — a small studio of my
            curiosity and patience packed into a single app.
            </p>
          </motion.div>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="">
                  <Image
                    src="/logo.png"
                    alt="AccioFocus Mascot"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-xl font-bold">AccioFocus</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Helping romanticize productivity since 2025.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-gray-300">
                <FaHeart className="text-red-400 animate-pulse" />
                <span className="text-sm">Made with love</span>
              </div>
              
              <Link 
                href="/"
                className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              This is a personal project — a labor of love and learning. 
              Feel free to explore, study, or simply enjoy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}