import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExamCard from "../components/ExamCard";
import SkeletonCard from "../components/SkeletonCard";
import NavBar from "../components/NavBar";
import { Search, ArrowLeft } from "lucide-react";

const Explore = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const loadAllExams = async (query = "") => {
    setLoading(true);
    try {
      // Fetching all exams without a limit
      const res = await fetch(`https://filerepository.onrender.com/api/exam/fetchExams?search=${query}`);
      const data = await res.json();
      setExams(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAllExams(); }, []);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation Breadcrumb */}
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors mb-6 text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Full Archive</h1>
            <p className="text-gray-500">Browsing all available past questions and notes</p>
          </div>
          
          <div className="relative w-full md:w-96">
             <input 
               className="w-full bg-[#1a1d23] border border-gray-800 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500 transition-all text-sm"
               placeholder="Filter by code, title, or year..."
               value={searchTerm}
               onChange={(e) => {
                 setSearchTerm(e.target.value);
                 loadAllExams(e.target.value);
               }}
             />
             <Search size={18} className="absolute left-4 top-3.5 text-gray-500" />
          </div>
        </div>

        {/* Results Grid with Loading State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Show 8 skeleton cards while loading
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : exams.length > 0 ? (
            exams.map(exam => <ExamCard key={exam.id} exam={exam} />)
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              No documents found for "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
