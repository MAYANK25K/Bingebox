import React from 'react';
import Navbar from './Navbar'; 
import { ChevronRight } from 'lucide-react'; 

// 1. Accept the onGetStarted prop
const Hero = ({ onGetStarted }) => {
  return (
    // REMOVED: border-b-8 border-[#232323] (This removes the gray separation line)
    <div className="relative w-full h-175 lg:h-200 overflow-hidden bg-black">
      
      <Navbar />

      {/* 2. Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          className="w-full h-full object-cover opacity-60" 
          // UPDATED: Using a stable Unsplash image that looks like a movie collage
          // You can replace this URL with your own local image later
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/IN-en-20251229-TRIFECTA-perspective_d7edcd70-4cfd-441c-858c-c5e400ed6c2b_large.jpg" 
          alt="Netflix Background" 
        />
        
        {/* Gradient Overlay: Darkens the image so text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      {/* 3. Hero Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 pt-16">
        <h1 className="text-1rem md:text-6xl lg:text-[4rem] font-black text-white max-w-4xl leading-tight">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4 font-normal">
          Starts at ₹149. Cancel at any time.
        </p>
        <p className="text-white text-lg md:text-xl mt-6 px-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* Input Form */}
        <div className="mt-6 flex flex-col md:flex-row gap-3 w-full max-w-3xl px-4">
          <input 
            type="email" 
            placeholder="Email address" 
            className="flex-1 bg-black/40 border border-gray-500/70 text-white p-4 rounded text-base placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition bg-opacity-40 backdrop-blur-sm"
          />
          {/* 2. Added onClick handler here */}
          <button 
            onClick={onGetStarted}
            className="bg-[#E50914] text-white text-2xl px-6 py-3 rounded font-bold hover:bg-[#c11119] flex items-center justify-center gap-2 whitespace-nowrap transition duration-200"
          >
            Get Started 
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

     {/* 4. The "Red & Blue" Curved Arch Separator */}
      {/* This creates the "Hill" effect. 
         - The div is wider than the screen (w-[150%])
         - It is pushed to the left (-left-[25%]) to center the curve.
         - rounded-[50%_50%_0_0] creates the arch shape.
         - The border-t-2 border-red-600 creates the red line.
         - The radial gradient background creates the blue-ish glow fading into black.
      */}
      <div className="absolute -bottom-12 left-[-25%] w-[150%] h-32 z-20 overflow-hidden rounded-[50%_50%_0_0] border-t-2 border-red-600 bg-gradient-to-b from-black via-[#000000] to-[#000000]">
          {/* Optional: Add a subtle red glow under the red border */}
          <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-red-900/40 opacity-50"></div>
      </div>

    </div>
  );
};

export default Hero;