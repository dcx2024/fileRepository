import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';

const ContributeForm = ({ onClose, refreshExams }) => {
  const [formData, setFormData] = useState({
    title: '',
    course_code: '',
    semester: '1',
    academic_year: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('course_code', formData.course_code);
    data.append('semester', formData.semester);
    data.append('academic_year', formData.academic_year);
    
    files.forEach((file) => {
      data.append('files', file); 
    });

    try {
      const response = await fetch('https://filerepository.onrender.com/api/admin/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          refreshExams();
          onClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      
      <div className="bg-[#11141a] border border-white/5 w-full max-w-xl rounded-3xl p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl shadow-emerald-500/10">
        
        {/* Success Overlay - Switched to Emerald */}
        {status === 'success' && (
          <div className="absolute inset-0 bg-emerald-600 flex flex-col items-center justify-center z-30 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={64} className="mb-4 text-white" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Upload Successful!</h2>
          </div>
        )}

        <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#11141a] py-2 z-20">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Contribute to Archive</h2>
            <div className="h-1 w-12 bg-emerald-500 mt-1 rounded-full"></div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-emerald-400 p-2 transition-colors"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Exam Title</label>
            <input 
              required name="title" onChange={handleChange}
              placeholder="e.g., MTH 101 Mid-term 2023"
              className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 text-white font-mono text-sm placeholder:text-gray-700 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Course Code</label>
              <input 
                required name="course_code" onChange={handleChange}
                placeholder="CSC 201"
                className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 text-white font-mono text-sm placeholder:text-gray-700 transition-all"
              />
            </div>
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Academic Year</label>
              <input 
                required name="academic_year" onChange={handleChange}
                placeholder="2023/2024"
                className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 text-white font-mono text-sm placeholder:text-gray-700 transition-all"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-emerald-500 transition-colors">Semester</label>
            <select 
              name="semester" onChange={handleChange}
              className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl p-4 focus:outline-none focus:border-emerald-500/50 text-white font-mono text-sm appearance-none transition-all cursor-pointer"
            >
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
            </select>
          </div>

          {/* Upload Zone - Emerald Style */}
          <div className="border-2 border-dashed border-white/5 rounded-3xl p-8 text-center hover:border-emerald-500/40 hover:bg-emerald-500/[0.02] transition-all group/upload">
            <input 
              type="file" multiple id="file-upload" 
              className="hidden" onChange={handleFileChange} 
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 mb-4 group-hover/upload:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <span className="text-gray-300 font-bold text-sm uppercase tracking-tighter">Click to upload files</span>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest mt-2">PDFs or Images (Max 10)</span>
            </label>
            
            {files.length > 0 && (
              <div className="mt-6 text-left space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/10 truncate">
                    <FileText size={14} /> {f.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" disabled={loading || files.length === 0}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-gray-800 disabled:to-gray-900 text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/10 active:scale-[0.98]"
          >
            {loading ? "INITIALIZING UPLOAD..." : "Upload Exam"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContributeForm;
