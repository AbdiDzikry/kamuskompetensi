import React from 'react';
import { CheckCircle, Target, Star, Calendar } from 'lucide-react';
import SkillCard from './SkillCard';

const LEVEL_CONFIG = {
  Basic: {
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    bgColor: 'bg-green-50/50',
  },
  Intermediate: {
    icon: <Target className="w-5 h-5 text-blue-600" />,
    bgColor: 'bg-blue-50/50',
  },
  Expert: {
    icon: <Star className="w-5 h-5 text-purple-600" />,
    bgColor: 'bg-purple-50/50',
  },
};

const CompetencyLevel = ({ level, skills, onGenerateQuiz, onGenerateRoadmap }) => {
  const config = LEVEL_CONFIG[level];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className={`px-6 py-4 border-b border-slate-100 flex items-center justify-between ${config.bgColor}`}>
        <div className="flex items-center gap-3">
          {config.icon}
          <h3 className="font-bold text-lg text-slate-800">Level {level}</h3>
        </div>
        
        <button 
          onClick={() => onGenerateRoadmap(level)}
          className="flex items-center gap-2 text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          Buat Roadmap
        </button>
      </div>
      
      <div className="divide-y divide-slate-50">
        {skills.map((skill, idx) => (
          <SkillCard
            key={idx}
            skill={skill}
            onGenerateQuiz={onGenerateQuiz}
          />
        ))}
      </div>
    </div>
  );
};

export default CompetencyLevel;
