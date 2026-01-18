import React from 'react';
import { FileText, Download, Calendar, BookOpen, ExternalLink } from 'lucide-react';

const ExamCard = ({ exam }) => {
  return (
    <div className="group relative bg-[#11141a]/60 backdrop-blur-sm p-6 rounded-3xl border border-white/5 hover:border-cyan-500/40 transition-all duration-500 flex flex-col h-full min-h-[400px] overflow-hidden">
      
      {/* Decorative Gradient Glow (Top Right) */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-all duration-500"></div>

      {/* Top Section */}
      <div className="flex justify-between items-start mb-6 z-10">
        <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-2xl text-cyan-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
          <FileText size={26} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">
            {exam.academic_year}
          </span>
          <div className="h-1 w-8 bg-cyan-500/30 rounded-full group-hover:w-12 transition-all duration-500"></div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mb-6 z-10">
        <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight line-clamp-2" title={exam.title}>
          {exam.title}
        </h3>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-tighter mt-2 flex items-center gap-2">
          <span className="text-cyan-500/80">{exam.course_code}</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
          <span>Semester {exam.semester}</span>
        </p>
      </div>

      {/* File List Section - Terminal Style Container */}
      <div className="flex-grow bg-black/40 rounded-2xl p-4 mb-4 border border-white/5 space-y-3 max-h-40 overflow-y-auto custom-scrollbar z-10">
        {exam.files?.map((file) => {
          const fileNameOnServer = file.path.split(/[\\/]/).pop();
          return (
            <div key={file.id} className="flex items-center justify-between group/item">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover/item:bg-cyan-400"></div>
                <span className="text-gray-400 text-[11px] font-medium truncate w-32 group-hover/item:text-gray-200 transition-colors" title={file.name}>
                  {file.name}
                </span>
              </div>
              <a 
                href={`https://filerepository.onrender.com/api/exam/exam/download/${fileNameOnServer}`} 
                download={file.name}
                className="text-[10px] font-black uppercase tracking-tighter text-cyan-500 hover:text-white flex items-center gap-1 shrink-0 transition-colors"
              >
                GET <Download size={12} />
              </a>
            </div>
          );
        })}
        
        {(!exam.files || exam.files.length === 0) && (
          <div className="flex flex-col items-center justify-center py-4 opacity-40">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Database_Empty</p>
          </div>
        )}
      </div>

      {/* Footer Stats - Tech Badge Style */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] z-10">
        <span className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors cursor-default">
          <Calendar size={12} className="text-cyan-600"/> 
          {exam.created_date ? new Date(exam.created_date).toLocaleDateString() : '00/00/00'}
        </span>
        <div className="bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded-md border border-cyan-500/20">
          {exam.files?.length || 0} OBJECTS
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
