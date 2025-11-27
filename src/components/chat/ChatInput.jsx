import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ input, setInput, onSend, loading }) => {
  return (
    <form onSubmit={onSend} className="p-3 bg-white border-t border-slate-100">
      <div className="relative">
        <input
          type="text"
          placeholder="Tanya Coach..."
          className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button 
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2 top-2 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-slate-300 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
