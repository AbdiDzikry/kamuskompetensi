import React, { useEffect, useRef } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import ChatInput from './ChatInput';
import ReactMarkdown from 'react-markdown';

const ChatAssistant = ({ jobData, history, input, setInput, onSend, loading }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden flex flex-col h-[calc(100vh-120px)] max-h-[600px]">
      <div className="bg-primary-600 p-4 text-white flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        <h3 className="font-bold">Coach AI Assistant</h3>
      </div>
      
      {/* Chat History */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
        {history.length === 0 && (
          <div className="text-center text-slate-400 text-sm py-8 px-4">
            <p>Bingung dengan salah satu skill? Tanyakan di sini!</p>
            <p className="mt-2 text-xs bg-white p-2 rounded border border-slate-200 inline-block">
              "Apa projek pemula untuk belajar {jobData.levels.Basic[0]?.name}?"
            </p>
          </div>
        )}
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
              msg.sender === 'user' 
                ? 'bg-primary-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
            }`}>
              <div className="prose prose-sm">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={onSend}
        loading={loading}
      />
    </div>
  );
};

export default ChatAssistant;
