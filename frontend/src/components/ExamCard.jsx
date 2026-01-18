import React from 'react';
import { FileText, Download, Calendar, BookOpen, Image as ImageIcon } from 'lucide-react';

const ExamCard = ({ exam }) => {
  return (
    // 'flex-col h-full' ensures the card stretches to match the tallest sibling in its row
    <div className="bg-[#1a1d23] p-5 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all flex flex-col h-full min-h-[380px]">
      
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
          <FileText size={24} />
        </div>
        <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400 font-medium">
          {exam.academic_year}
        </span>
      </div>

      {/* Info Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1 leading-tight truncate" title={exam.title}>
          {exam.title}
        </h3>
        <p className="text-gray-500 text-sm">
          {exam.course_code} • Sem {exam.semester}
        </p>
      </div>

      {/* File List Section - FIXED HEIGHT WITH SCROLL */}
      {/* 'max-h-32 overflow-y-auto' prevents the card from growing too long */}
      <div className="flex-grow space-y-3 border-t border-gray-800 pt-4 mt-auto max-h-40 overflow-y-auto custom-scrollbar pr-2">
        {exam.files.map((file) => {
          const fileNameOnServer = file.path.split('\\').pop().split('/').pop();
          return (
            <div key={file.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-400 truncate w-32" title={file.name}>{file.name}</span>
              <a 
                href={`https://filerepository.onrender.com/api/exam/download/${fileNameOnServer}`} 
                download={file.name}
                className="text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1 shrink-0"
              >
                <Download size={14} /> Download
              </a>
            </div>
          );
        })}
      </div>

      {/* Footer Stats - Pushed to the very bottom */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-800/50 text-[10px] text-gray-500 uppercase tracking-wider">
        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(exam.created_date).toLocaleDateString()}</span>
        <span className="flex items-center gap-1"><BookOpen size={12}/> {exam.files.length} Files</span>
      </div>
    </div>
  );
};

export default ExamCard;
