import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState("");
  const [stopTyping, setStopTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");
    setBotTyping("");
    setStopTyping(false);

    try {
      const res = await axios.post(
        +BASE_URL + "/chatbot",
        { question },
        { withCredentials: true }
      );
      const botResponse = res.data.result || "Sorry, I didn't understand that.";
      await typeEffect(botResponse);
    } catch {
      await typeEffect("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const typeEffect = async (text) => {
    let display = "";
    for (let i = 0; i < text.length; i++) {
      if (stopTyping) return;
      display += text[i];
      setBotTyping(display);
      await new Promise((r) => setTimeout(r, 10));
    }
    setChat((prev) => [
      ...prev,
      {
        sender: "bot",
        text,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setBotTyping("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendQuestion();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, botTyping]);

  return (
    <div className="flex flex-col w-full h-full px-4 py-6 bg-gradient-to-tr from-orange-100 via-green-100 to-sky-100">
      <div className="relative flex flex-col w-full h-full max-w-3xl p-6 mx-auto bg-white border border-gray-200 shadow-xl rounded-3xl">
        {/* Floating Swāsthya AI Header */}
        <div className="absolute flex items-center justify-center w-16 h-16 text-3xl text-white transform -translate-x-1/2 bg-green-600 border-4 border-white rounded-full shadow-lg -top-8 left-1/2">
          🩺
        </div>
        <h2 className="mt-10 mb-2 text-2xl font-bold text-center text-green-700">
          Swāsthya AI
        </h2>
        <p className="mb-4 text-sm text-center text-gray-600">
          Your Personal Health Assistant
        </p>

        {/* Chat Area */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto border border-gray-100 shadow-inner bg-gray-50 rounded-2xl">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`relative px-4 py-2 max-w-xs rounded-2xl text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-green-100 text-green-900 rounded-bl-none"
                }`}
              >
                {msg.text}
                <div className="text-[10px] text-right mt-1 opacity-60">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Typing animation */}
          {botTyping && (
            <div className="flex items-start gap-2">
              <div className="px-3 py-1 text-sm bg-green-200 rounded-2xl animate-pulse">
                {botTyping}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex flex-wrap gap-3 mt-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask your health query..."
            className="flex-1 px-4 py-2 border border-gray-300 shadow outline-none rounded-xl focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={sendQuestion}
            disabled={loading}
            className="px-5 py-2 text-white transition-all bg-green-600 shadow-md rounded-xl hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
