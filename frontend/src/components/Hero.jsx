import React from 'react';
import { Database } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-10 bg-[#050608] overflow-hidden">
      
      {/* Subtle Emerald Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-emerald-500/10 blur-[100px] rounded-full opacity-40"></div>

      {/* Main Title - Original Text with Emerald Style */}
      <h1 className="relative z-10 text-5xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
        Access the <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">Archive</span>
      </h1>

      {/* Description - Original Text with Tech Styling */}
      <p className="relative z-10 max-w-2xl text-base md:text-lg text-gray-500 font-bold tracking-wide leading-relaxed">
        Search across thousands of <span className="text-emerald-400/80">past exams</span>, 
        <span className="text-emerald-400/80"> lecture notes</span>, and 
        <span className="text-emerald-400/80"> research papers</span>.
      </p>

      {/* Decorative Tech Divider */}
      <div className="mt-10 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-emerald-500 to-transparent"></div>
        <Database size={18} className="text-emerald-500" />
      </div>
    </div>
  );
};

export default Hero;
