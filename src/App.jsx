import React, { useState, useRef, useEffect } from 'react';
import { generateContent, generateChatResponse } from './api/gemini';
import HomeView from './views/HomeView';
import DetailView from './views/DetailView';
import Header from './components/Header';
import QuizModal from './components/modals/QuizModal';
import RoadmapModal from './components/modals/RoadmapModal';

export default function App() {
  // Main State
  const [searchTerm, setSearchTerm] = useState("");
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home"); // 'home', 'detail'
  
  // Chat State
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // New Feature State: Quiz & Roadmap
  const [activeModal, setActiveModal] = useState(null); // 'quiz' | 'roadmap' | null
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null); // index of selected answer

  // Handler: Cari Kompetensi
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setJobData(null);
    setChatHistory([]);

    const prompt = `
      Buatkan "Kamus Kompetensi" lengkap untuk posisi pekerjaan: "${searchTerm}".
      
      Output HARUS dalam format JSON dengan struktur persis seperti ini:
      {
        "title": "${searchTerm}",
        "description": "Deskripsi singkat tentang peran ini (maks 2 kalimat).",
        "levels": {
          "Basic": [
            { "name": "Nama Skill", "desc": "Penjelasan skill", "search_keyword": "Keyword spesifik untuk mencari materi belajar skill ini" }
          ],
          "Intermediate": [
            { "name": "Nama Skill", "desc": "Penjelasan skill", "search_keyword": "Keyword spesifik untuk mencari materi belajar skill ini" }
           ],
          "Expert": [
            { "name": "Nama Skill", "desc": "Penjelasan skill", "search_keyword": "Keyword spesifik untuk mencari materi belajar skill ini" }
          ]
        }
      }
      
      Aturan:
      1. Berikan minimal 3 skill per level.
      2. Campurkan Hard Skill dan Soft Skill.
      3. Pastikan search_keyword sangat spesifik.
      4. Gunakan Bahasa Indonesia.
    `;

    try {
      const result = await generateContent(prompt);
      setJobData(result);
      setView("detail");
    } catch (err) {
      setError(err.message || "Gagal menghasilkan data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Handler: Generate Quiz
  const handleGenerateQuiz = async (skillName) => {
    setActiveModal('quiz');
    setModalLoading(true);
    setModalData(null);
    setQuizAnswer(null);

    const prompt = `
      Buatkan 1 soal pilihan ganda (4 opsi) untuk menguji pemahaman tentang skill "${skillName}" 
      untuk posisi "${jobData.title}".
      
      Format JSON: 
      { 
        "skill": "${skillName}",
        "question": "Pertanyaan...", 
        "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], 
        "correctIndex": 0,
        "explanation": "Penjelasan singkat kenapa jawabannya benar." 
      }
    `;

    try {
      const result = await generateContent(prompt);
      setModalData(result);
    } catch (err) {
      // Menampilkan error di modal atau sebagai notifikasi terpisah akan lebih baik,
      // tapi untuk sekarang kita set error utama.
      setError(err.message || "Gagal membuat kuis.");
      setActiveModal(null);
    } finally {
      setModalLoading(false);
    }
  };

  // Handler: Generate Roadmap
  const handleGenerateRoadmap = async (level) => {
    setActiveModal('roadmap');
    setModalLoading(true);
    setModalData(null);

    const prompt = `
      Buatkan roadmap belajar 4 minggu untuk mencapai level "${level}" pada posisi "${jobData.title}".
      
      Format JSON: 
      { 
        "level": "${level}",
        "weeks": [
          { "week": 1, "focus": "Fokus minggu ini", "tasks": ["Tugas 1", "Tugas 2", "Tugas 3"] },
          { "week": 2, "focus": "...", "tasks": [...] },
          { "week": 3, "focus": "...", "tasks": [...] },
          { "week": 4, "focus": "...", "tasks": [...] }
        ]
      }
    `;

    try {
      const result = await generateContent(prompt);
      setModalData(result);
    } catch (err) {
      setError(err.message || "Gagal membuat roadmap.");
      setActiveModal(null);
    } finally {
      setModalLoading(false);
    }
  };

  // Handler: Kirim Chat
  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatLoading(true);

    const reply = await generateChatResponse(chatHistory, jobData, userMsg);
    
    setChatHistory(prev => [...prev, { sender: 'ai', text: reply }]);
    setChatLoading(false);
  };

  const handleBack = () => {
    setView("home");
    setChatHistory([]);
    setSearchTerm("");
    setJobData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header onBack={handleBack} />

      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {view === 'home' ? (
          <HomeView
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            loading={loading}
            error={error}
          />
        ) : (
          jobData && (
            <DetailView
              jobData={jobData}
              handleBack={handleBack}
              onGenerateQuiz={handleGenerateQuiz}
              onGenerateRoadmap={handleGenerateRoadmap}
              chatHistory={chatHistory}
              chatInput={chatInput}
              setChatInput={setChatInput}
              handleSendChat={handleSendChat}
              chatLoading={chatLoading}
            />
          )
        )}

        {activeModal === 'quiz' && (
          <QuizModal
            isOpen={activeModal === 'quiz'}
            onClose={() => setActiveModal(null)}
            modalLoading={modalLoading}
            modalData={modalData}
            quizAnswer={quizAnswer}
            setQuizAnswer={setQuizAnswer}
          />
        )}

        {activeModal === 'roadmap' && (
          <RoadmapModal
            isOpen={activeModal === 'roadmap'}
            onClose={() => setActiveModal(null)}
            modalLoading={modalLoading}
            modalData={modalData}
          />
        )}
      </main>

      <footer className="py-2 text-center text-slate-300 text-xs">
        Concept by Luthfi Dhimas &middot; Developed by <a href="https://www.linkedin.com/in/sulthan-abdi-dzikry/" target="_blank" rel="noreferrer" className="hover:text-primary-600 transition-colors">Sulthan Abdi Dzikry</a>
      </footer>
    </div>
  );
}
