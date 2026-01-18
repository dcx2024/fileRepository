import React, { useState } from 'react';
import { Bell, Plus, LayoutDashboard, Search, Menu } from 'lucide-react';
import ContributeForm from './ContributeForm';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 w-full px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Emerald Brand Logo Section */}
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => window.location.href = "/"}
          >
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <LayoutDashboard size={22} className="text-[#0f1115]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">
                NACOS<span className="text-emerald-400 font-light italic">ARCH</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] leading-none mt-1 uppercase">
                KDU Repository
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest text-gray-400">
            <a href="#/explore" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
              <Search size={14} /> Browse
            </a>
            
            {/* The "Contribute" Button with Emerald Glow */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative px-5 py-2 overflow-hidden group rounded-full bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-400/50 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                <Plus size={16} className="text-emerald-400" />
                Contribute
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>

            <a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </div>

          {/* Actions & Profile */}
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-emerald-400 transition-colors relative p-2 rounded-full hover:bg-white/5">
              <Bell size={20} />
              {/* Notification Pulse Glow */}
              <span className="absolute top-2 right-2 bg-emerald-500 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-gray-800 mx-2 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-[10px] text-white font-bold leading-none">NACOS MEMBER</p>
                <p className="text-[9px] text-emerald-400 font-medium">Verified Account</p>
              </div>
              
              {/* Profile Image with Emerald Border Gradient */}
              <div className="w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-emerald-500 to-emerald-200">
                <div className="w-full h-full rounded-[10px] bg-[#0f1115] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                </div>
              </div>
            </div>
            
            <button className="md:hidden text-gray-400 p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

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
