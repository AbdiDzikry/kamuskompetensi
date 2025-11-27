import React from 'react';
import { HelpCircle, Loader2, Check } from 'lucide-react';
import Modal from './Modal';

const QuizModal = ({ isOpen, onClose, modalLoading, modalData, quizAnswer, setQuizAnswer }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tes Pemahaman Skill"
      titleIcon={<HelpCircle className="w-5 h-5 text-primary-600" />}
    >
      {modalLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mb-3" />
          <p>Sedang meminta materi dari AI...</p>
        </div>
      ) : modalData ? (
        <div>
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded mb-3 inline-block">
            {modalData.skill}
          </span>
          <h4 className="text-lg font-medium text-slate-900 mb-6">{modalData.question}</h4>
          
          <div className="space-y-3">
            {modalData.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setQuizAnswer(idx)}
                disabled={quizAnswer !== null}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  quizAnswer === null 
                    ? 'border-slate-200 hover:border-primary-400 hover:bg-primary-50' 
                    : quizAnswer === idx 
                      ? idx === modalData.correctIndex 
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20' 
                        : 'border-red-300 bg-red-50'
                      : idx === modalData.correctIndex
                        ? 'border-green-500 bg-green-50'
                        : 'border-slate-100 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                    quizAnswer === idx 
                      ? idx === modalData.correctIndex ? 'bg-green-500 text-white border-green-500' : 'bg-red-500 text-white border-red-500'
                      : 'border-slate-300 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{opt}</span>
                  {quizAnswer !== null && idx === modalData.correctIndex && <Check className="w-5 h-5 text-green-600 ml-auto" />}
                </div>
              </button>
            ))}
          </div>

          {quizAnswer !== null && (
            <div className={`mt-6 p-4 rounded-xl border ${quizAnswer === modalData.correctIndex ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className={`font-bold mb-1 ${quizAnswer === modalData.correctIndex ? 'text-green-800' : 'text-red-800'}`}>
                {quizAnswer === modalData.correctIndex ? "Benar! 🎉" : "Kurang Tepat."}
              </p>
              <p className="text-sm text-slate-700">{modalData.explanation}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-red-500 py-8">Gagal memuat data. Silakan coba lagi.</div>
      )}
    </Modal>
  );
};

export default QuizModal;
