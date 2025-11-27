import React from 'react';
import { ArrowLeft, Briefcase } from 'lucide-react';

const JobHeader = ({ title, description, onBack }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <button onClick={onBack} className="text-sm text-slate-500 hover:text-primary-600 flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" /> Kembali ke pencarian
      </button>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
        <div className="bg-primary-50 p-3 rounded-xl hidden sm:block">
          <Briefcase className="w-8 h-8 text-primary-600" />
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
