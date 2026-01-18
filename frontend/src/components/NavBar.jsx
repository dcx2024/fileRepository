import React, { useState } from 'react';
import { Bell, User, Plus } from 'lucide-react';
import ContributeForm from './ContributeForm'; // Import your form

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#0f1115] border-b border-gray-800 sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">ScholarArch</h1>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="/explore" className="hover:text-white transition-colors">Browse</a>
            {/* Trigger Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Plus size={16} className="text-blue-500" />
              Contribute
            </button>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-[#0f1115]"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-gray-800 pl-6">
              <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition-all">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Conditionally Render the Modal */}
      {isModalOpen && (
        <ContributeForm 
          onClose={() => setIsModalOpen(false)} 
          refreshExams={() => window.location.reload()} 
        />
      )}
    </>
  );
};

export default NavBar;
