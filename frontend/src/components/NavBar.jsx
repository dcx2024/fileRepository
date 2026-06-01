import React, { useState } from 'react';
import { Bell, LayoutDashboard, Search, Menu, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContributeForm from './ContributeForm';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 w-full px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => window.location.href = "/"}
          >
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <LayoutDashboard size={22} className="text-[#0f1115]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">
                Scholar<span className="text-emerald-400 font-light italic">Arch</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] leading-none mt-1 uppercase">
                KDU Repository
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-widest text-gray-400">
            <Link to="/explore" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
              <Search size={14} /> Browse
            </Link>
            
            {/* Trigger Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Plus size={16} className="text-emerald-500" />
              Contribute
            </button>
            
            <a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </div>
          

          {/* Actions & Profile Area */}
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-emerald-400 transition-colors relative p-2 rounded-full hover:bg-white/5">
              <Bell size={20} />
              <span className="absolute top-2 right-2 bg-emerald-500 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-gray-800 mx-2 hidden md:block"></div>
            
            <Link to="/login" className="flex items-center gap-3 group/member hover:opacity-80 transition-all">
              <div className="hidden md:block text-right">
                <p className="text-[10px] text-white font-bold leading-none group-hover/member:text-emerald-400 transition-colors">NACOS MEMBER</p>
                <p className="text-[9px] text-emerald-500 font-medium">Click to Login</p>
              </div>
              
              <div className="w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-emerald-500 to-emerald-200 group-hover/member:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                <div className="w-full h-full rounded-[10px] bg-[#0f1115] overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                </div>
              </div>
            </Link>
            
            <button className="md:hidden text-gray-400 p-2">
              <Menu size={24} />
            </button>
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