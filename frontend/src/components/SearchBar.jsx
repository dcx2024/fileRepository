import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExamCard from "./ExamCard";
import { Search, ChevronDown, LayoutGrid, List } from "lucide-react";

// Helper Skeleton Component for loading states
const SkeletonCard = () => (
  <div className="bg-[#1a1d23] p-5 rounded-2xl border border-gray-800 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-800 rounded-lg w-12 h-12"></div>
      <div className="bg-gray-800 h-4 w-16 rounded"></div>
    </div>
    <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
    <div className="space-y-2 border-t border-gray-800 pt-4">
      <div className="h-3 bg-gray-800 rounded w-full"></div>
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
      let url = `http://localhost:3000/api/exam/fetchExams?search=${query}`;
      if (limit) url += `&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Error loading exams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, [limit]);

  return (
    <div className="bg-[#0f1115] text-white">
      {/* Search Input HTML Section */}
      <div className="flex justify-center px-4 pb-16 pt-8">
        <div className="relative w-full max-w-2xl flex items-center">
          <div className="absolute left-4 text-gray-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by course code, title, or academic year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1d23] border border-gray-800 rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-blue-500 text-gray-200 placeholder-gray-500 transition-all"
          />
          <button 
            onClick={() => loadExams(searchTerm)}
            className="absolute right-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results Grid Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {limit ? "Recent Uploads" : "Full Archive"}
            </h2>
            <p className="text-sm text-gray-500">
              {loading ? "Searching archive..." : `Found ${exams.length} items`}
            </p>
          </div>
          <div className="flex bg-[#1a1d23] p-1 rounded-lg border border-gray-800">
            <button className="p-2 bg-blue-600 rounded-md text-white"><LayoutGrid size={18}/></button>
            <button className="p-2 text-gray-500 hover:text-white transition-colors"><List size={18}/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            // Show skeletons while fetching
            Array(limit || 6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            exams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
          )}
        </div>

       {/* Simplified View More Button Logic */}
{showViewMore && (
  <div className="flex justify-center mt-12 pb-20">
    <Link 
      to="/explore" 
      className="bg-[#1a1d23] border border-gray-800 px-10 py-4 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white hover:border-blue-500 transition-all flex items-center gap-3 font-bold group"
    >
      <span>View More Documents</span>
      <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform text-blue-500" />
    </Link>
  </div>
)}
      </div>
    </div>
  );
};

export default SearchBar;