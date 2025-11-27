import React from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';
import Modal from './Modal';

const RoadmapModal = ({ isOpen, onClose, modalLoading, modalData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Roadmap Belajar"
      titleIcon={<GraduationCap className="w-5 h-5 text-primary-600" />}
    >
      {modalLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mb-3" />
          <p>Sedang meminta materi dari AI...</p>
        </div>
      ) : modalData ? (
        <div>
          <div className="mb-4">
            <h4 className="text-xl font-bold text-slate-900">Roadmap Level {modalData.level}</h4>
            <p className="text-sm text-slate-500">Rencana belajar intensif 4 minggu</p>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary-600 before:via-slate-300 before:to-transparent">
            {modalData.weeks.map((weekData, idx) => (
              <div key={idx} className="relative flex items-start pl-12 group">
                <div className="absolute left-0 top-1 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-white">
                  W{weekData.week}
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full group-hover:border-indigo-200 transition-colors">
                  <h5 className="font-bold text-primary-700 mb-2">{weekData.focus}</h5>
                  <ul className="space-y-2">
                    {weekData.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 py-8">Gagal memuat data. Silakan coba lagi.</div>
      )}
    </Modal>
  );
};

export default RoadmapModal;
