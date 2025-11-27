import React from 'react';
import { Search, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const POPULAR_JOBS = ["Full Stack Developer", "Content Creator", "HR Manager", "Data Scientist"];

const HomeView = ({ searchTerm, setSearchTerm, handleSearch, loading, error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center animate-fadeIn">
      <div className="mb-8 p-4 bg-primary-50 rounded-full inline-block">
                    <Sparkles className="w-12 h-12 text-primary-600" />      </div>
      
      <h2 className="text-4xl font-extrabold mb-4 text-slate-900">
        Cari Standar Kompetensi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Pekerjaan Apapun</span>
      </h2>
      
      <p className="text-slate-500 mb-8 text-lg">
        Generate roadmap skill, kuis interaktif, dan panduan belajar dari level Basic hingga Expert dalam hitungan detik.
      </p>

      <form onSubmit={handleSearch} className="w-full relative group">
        <input
          type="text"
          className="w-full pl-6 pr-14 py-5 rounded-2xl border-2 border-slate-200 shadow-xl text-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
          placeholder="Contoh: AI Engineer, Barista, CEO Startup..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !searchTerm}
          className="absolute right-3 top-3 bottom-3 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-xl transition-colors disabled:bg-slate-300"
        >
          {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Search className="w-6 h-6" />}
        </button>
      </form>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-slate-400">Populer:</span>
        {POPULAR_JOBS.map(job => (
          <button 
            key={job}
            onClick={() => setSearchTerm(job)}
            className="text-sm px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
          >
            {job}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
};

export default HomeView;
