import React from 'react';
import { Brain } from 'lucide-react';

const Header = ({ onBack }) => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-purple-700 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={onBack}>
          <Brain className="w-8 h-8 text-yellow-300" />
          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-tight">Kamus Kompetensi AI</h1>
            <p className="text-xs text-primary-200">Cari posisi pekerjaan dan dapatkan skill kompetensi apa saja yang dibutuhkan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
