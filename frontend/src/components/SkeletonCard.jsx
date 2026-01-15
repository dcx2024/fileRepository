import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="bg-[#1a1d23] p-5 rounded-2xl border border-gray-800 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-800 rounded-lg w-12 h-12"></div>
        <div className="bg-gray-800 h-4 w-16 rounded"></div>
      </div>
      <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
      <div className="space-y-2 border-t border-gray-800 pt-4">
        <div className="h-3 bg-gray-800 rounded w-full"></div>
        <div className="h-3 bg-gray-800 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard