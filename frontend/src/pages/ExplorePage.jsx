import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExamCard from "../components/ExamCard";
import SkeletonCard from "../components/SkeletonCard";
import NavBar from "../components/NavBar";
import { Search, ArrowLeft, Database, Terminal } from "lucide-react";

const Explore = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const loadAllExams = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`https://filerepository.onrender.com/api/exam/fetchExams?search=${query}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setExams(data);
      } else {
        setExams([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAllExams(); }, []);

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-emerald-500/30">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation Breadcrumb - Emerald Cyber Style */}
        <Link to="/" className="flex items-center gap-2 text-emerald-500/50 hover:text-emerald-400 transition-all mb-8 text-[10px] font-black uppercase tracking-[0.2em] group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return_to_Main_Interface
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Database size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                Central<span className="text-emerald-500">_Archive</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                System_Status: Browsing_Full_Dataset
              </p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 group">
             {/* Emerald Input Glow */}
             <div className="absolute inset-0 bg-emerald-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <input 
               className="w-full bg-[#0a0c10] border-2 border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500/40 text-gray-200 font-mono text-xs transition-all shadow-2xl relative z-10"
               placeholder="QUERY_DATABASE: Filter by title, code..."
               value={searchTerm}
               onChange={(e) => {
                 setSearchTerm(e.target.value);
                 loadAllExams(e.target.value);
               }}
             />
             <Search size={18} className="absolute left-4 top-4 text-emerald-500/50 z-20" />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : exams.length > 0 ? (
            exams.map(exam => <ExamCard key={exam.id} exam={exam} />)
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
              <Terminal size={48} className="text-gray-800 mb-4" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-600">
                Error_404: No_Matching_Records_Found
              </p>
            </div>
          )}
        </div>

        {/* Emerald Footer Meta */}
        {!loading && exams.length > 0 && (
          <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-widest">
            <span>Archive_Access_Authorized</span>
            <span className="text-emerald-950 font-mono">{exams.length} SECTOR_ENTRIES_LOADED</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
