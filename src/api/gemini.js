// --- KONFIGURASI API ---
// Untuk Vercel/Netlify/lainnya: Gunakan Environment Variable VITE_GEMINI_API_KEY
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const handleApiError = async (response) => {
  if (response.status === 400) {
    return "Request tidak valid. Periksa kembali API Key Anda dan pastikan API sudah aktif di Google Cloud Console.";
  }
  if (response.status === 429) {
    return "Kuota gratis terlampaui. Silakan periksa akun Google Cloud Anda.";
  }
  if (response.status >= 500) {
    return "Server Google AI sedang mengalami masalah. Coba lagi nanti.";
  }
  const errorBody = await response.text();
  return `Terjadi kesalahan. Status: ${response.status}. Pesan: ${errorBody}`;
};

// --- HELPER: GEMINI API CALLS ---
export const generateContent = async (prompt) => {
  if (!apiKey) {
    throw new Error("API Key Gemini tidak ditemukan. Harap atur VITE_GEMINI_API_KEY di file .env Anda dan restart server.");
  }
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
             responseMimeType: "application/json"
          }
        }),
      }
    );

    if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
    }
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
        throw new Error("Format respons dari AI tidak valid atau kosong.");
    }

    try {
      // AI terkadang mengembalikan markdown ` ```json ... ``` `
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (e) {
      console.error("Gagal mem-parsing JSON dari respons AI:", text);
      throw new Error("AI tidak mengembalikan format JSON yang valid.");
    }

  } catch (error) {
    console.error("API Error:", error.message);
    throw error; // Re-throw error untuk ditangkap oleh komponen
  }
};

export const generateChatResponse = async (history, context, question) => {
  if (!apiKey) {
    return "API Key Gemini tidak ditemukan. Harap atur VITE_GEMINI_API_KEY di file .env Anda dan restart server.";
  }
  try {
    const contextPrompt = `
      Peran kamu adalah Karir Coach senior. Jawablah pertanyaan user berdasarkan data kompetensi ini: ${JSON.stringify(context)}.
      Jawab dengan ringkas, memotivasi, dan praktis dalam Bahasa Indonesia.
    `;

    // Menggabungkan history dan prompt untuk chat yang lebih kontekstual
    const contents = [
      ...history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      { role: "user", parts: [{ text: `Konteks: ${JSON.stringify(context)}. Pertanyaan: ${question}` }] }
    ];

    // Menambahkan prompt sistem di awal jika history kosong
    if (history.length === 0) {
        contents.unshift({ role: 'user', parts: [{ text: contextPrompt }]});
        contents.unshift({ role: 'model', parts: [{ text: "Tentu, saya siap membantu. Apa yang ingin Anda tanyakan mengenai kompetensi ini?" }]});
    }


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.";
  } catch (error) {
    console.error("Chat API Error:", error);
    return error.message || "Terjadi kesalahan saat menghubungi AI.";
  }
};
