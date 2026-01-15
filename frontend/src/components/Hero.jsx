import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-8 bg-[#0f1115]">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
        Access the Archive
      </h1>
      <p className="max-w-2xl text-lg text-gray-400">
        Search across thousands of past exams, lecture notes, and research papers.
      </p>
    </div>
  );
};

export default Hero;