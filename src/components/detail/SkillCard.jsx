import React from 'react';
import { HelpCircle, BookOpen, Youtube } from 'lucide-react';

const SkillCard = ({ skill, onGenerateQuiz }) => {
  return (
    <div className="p-6 hover:bg-slate-50 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-slate-900 text-lg">{skill.name}</h4>
        <div className="flex gap-2">
          <button
            onClick={() => onGenerateQuiz(skill.name)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-primary-50 text-primary-600 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
            title="Tes pemahamanmu tentang skill ini"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Tes Skill
          </button>
        </div>
      </div>
      <p className="text-slate-600 mb-4 text-sm">{skill.desc}</p>
      
      <div className="flex gap-3">
        <a 
          href={`https://www.google.com/search?q=${encodeURIComponent(skill.search_keyword + " article guide")}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" /> Baca Artikel
        </a>
        <a 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill.search_keyword + " tutorial")}`} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors"
        >
          <Youtube className="w-3.5 h-3.5" /> Tonton Video
        </a>
      </div>
    </div>
  );
};

export default SkillCard;
