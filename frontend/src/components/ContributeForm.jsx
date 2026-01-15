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
      const response = await fetch('http://localhost:3000/api/admin/upload', {
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Added 'max-h-[90vh]' and 'overflow-y-auto' 
          This makes the FORM scroll inside the modal 
      */}
      <div className="bg-[#1a1d23] border border-gray-800 w-full max-w-xl rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {status === 'success' && (
          <div className="absolute inset-0 bg-blue-600 flex flex-col items-center justify-center z-10">
            <CheckCircle2 size={64} className="mb-4" />
            <h2 className="text-2xl font-bold">Upload Successful!</h2>
          </div>
        )}

        <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#1a1d23] py-2 z-20">
          <h2 className="text-2xl font-bold text-white">Contribute to Archive</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Exam Title</label>
            <input 
              required name="title" onChange={handleChange}
              placeholder="e.g., MTH 101 Mid-term 2023"
              className="w-full bg-[#0f1115] border border-gray-800 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Course Code</label>
              <input 
                required name="course_code" onChange={handleChange}
                placeholder="CSC 201"
                className="w-full bg-[#0f1115] border border-gray-800 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Academic Year</label>
              <input 
                required name="academic_year" onChange={handleChange}
                placeholder="2023/2024"
                className="w-full bg-[#0f1115] border border-gray-800 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Semester</label>
            <select 
              name="semester" onChange={handleChange}
              className="w-full bg-[#0f1115] border border-gray-800 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-white"
            >
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors">
            <input 
              type="file" multiple id="file-upload" 
              className="hidden" onChange={handleFileChange} 
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="text-blue-500 mb-3" size={32} />
              <span className="text-gray-300 font-medium">Click to upload files</span>
              <span className="text-gray-500 text-xs mt-1">PDFs or Images (Max 10)</span>
            </label>
            
            {files.length > 0 && (
              <div className="mt-4 text-left space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 p-2 rounded truncate">
                    <FileText size={12} /> {f.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" disabled={loading || files.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            {loading ? "Processing..." : "Upload Exam"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContributeForm;