import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExamCard from "./ExamCard";
import { Search, ChevronDown, LayoutGrid, List, Database } from "lucide-react";

// Helper Skeleton Component with Emerald pulsing style
const SkeletonCard = () => (
  <div className="bg-[#11141a]/60 p-6 rounded-3xl border border-white/5 animate-pulse">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-white/5 rounded-2xl w-14 h-14"></div>
      <div className="bg-white/5 h-4 w-20 rounded-full"></div>
    </div>
    <div className="h-6 bg-white/5 rounded-full w-3/4 mb-2"></div>
    <div className="h-4 bg-white/5 rounded-full w-1/2 mb-8"></div>
    <div className="space-y-3 border-t border-white/5 pt-6">
      <div className="h-3 bg-white/5 rounded-full w-full"></div>
    </div>
  </div>
);

const SearchBar = ({ limit = null, showViewMore = false }) => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const loadExams = async (query = "") => {
    setLoading(true);
    try {
      let url = `https://filerepository.onrender.com/api/exam/fetchExams?search=${query}`;
      if (limit) url += `&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setExams(data);
      } else {
        setExams([]);
      }
    } catch (error) {
      console.error("Error loading exams:", error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, [limit]);

  return (
    <div className="bg-[#050608] text-white pt-10">
      {/* Emerald Style Search Input */}
      <div className="flex justify-center px-4 pb-20 pt-8">
        <div className="relative w-full max-w-3xl flex items-center group">
          {/* Subtle Outer Glow - Emerald */}
          <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="absolute left-5 text-emerald-500/50 group-focus-within:text-emerald-400 transition-colors">
            <Search size={22} />
          </div>
          
          <input
            type="text"
            placeholder="Search by course code, title, or academic year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && loadExams(searchTerm)}
            className="w-full bg-[#0a0c10] border-2 border-white/5 rounded-2xl py-5 pl-14 pr-40 focus:outline-none focus:border-emerald-500/40 text-gray-200 placeholder-gray-700 font-mono text-sm transition-all shadow-2xl z-10"
          />
          
          <button 
            onClick={() => loadExams(searchTerm)}
            className="absolute right-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all z-20 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            Execute
          </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Database size={20} className="text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                {limit ? "Recent_Logs" : "Full_Repository"}
              </h2>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
                {loading ? "Initializing..." : `Found_${exams.length}_Matching_Objects`}
              </p>
            </div>
          </div>
          
          <div className="flex bg-[#0a0c10] p-1.5 rounded-xl border border-white/5">
            <button className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><LayoutGrid size={18}/></button>
            <button className="p-2 text-gray-600 hover:text-white transition-colors"><List size={18}/></button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading ? (
            Array(limit || 6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            exams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
          )}
        </div>

        {/* Emerald View More Button */}
        {showViewMore && (
          <div className="flex justify-center mt-20 pb-24">
            <Link 
              to="/explore" 
              className="relative group px-12 py-5 rounded-2xl bg-[#0a0c10] border border-white/5 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                View More Documents
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform text-emerald-500" />
              </div>
              {/* Button Background Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
