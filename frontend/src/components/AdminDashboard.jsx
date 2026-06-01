import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, FileText, ArrowLeft, RefreshCw, Plus, Database, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ContributeForm from '../components/ContributeForm';

const AdminDashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/exam/fetchExams');
      const data = await res.json();
      setExams(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("CRITICAL: Permanent deletion requested. Proceed?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setExams(exams.filter(exam => exam.id !== id));
      } else {
        alert("Action unauthorized or server error.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => { fetchAdminData(); }, []);

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-emerald-500/30">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <Link to="/" className="text-emerald-500/50 hover:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-2 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> System_Root
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">
              Admin<span className="text-emerald-500">_Console</span>
            </h1>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Plus size={16} /> New_Upload
            </button>

            <button 
              onClick={fetchAdminData}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-emerald-400 transition-all group"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} />
            </button>
          </div>
        </div>

        {/* Emerald Table Container */}
        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                <th className="px-6 py-5">Entry_Metadata</th>
                <th className="px-6 py-5">Course_Code</th>
                <th className="px-6 py-5">Timestamp</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="4" className="px-6 py-8 bg-white/[0.01]"></td>
                  </tr>
                ))
              ) : exams.length > 0 ? (
                exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-emerald-500/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:scale-110 transition-transform">
                          <FileText size={16} />
                        </div>
                        <span className="text-sm font-bold text-gray-200 truncate max-w-xs">{exam.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                        {exam.course_code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                        <Calendar size={14} className="text-emerald-900" />
                        {new Date(exam.created_date || Date.now()).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(exam.id)}
                        disabled={deletingId === exam.id}
                        className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-30"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-24 text-center">
                    <div className="flex flex-col items-center opacity-20">
                      <Database size={48} className="mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">Zero_Records_Indexed</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dashboard Status Footer */}
        <div className="mt-6 flex justify-between items-center px-4">
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-600 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Core_Database_Synchronized
          </div>
          <p className="text-[9px] font-mono text-emerald-900 uppercase">
            {exams.length} Objects_Mapped
          </p>
        </div>
      </div>

      {isModalOpen && (
        <ContributeForm 
          onClose={() => setIsModalOpen(false)} 
          refreshExams={fetchAdminData} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;