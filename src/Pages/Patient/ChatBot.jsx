import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState("");
  const messagesEndRef = useRef(null);

  const sendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");
    setBotTyping("");

    try {
      const res = await axios.post(
        "http://localhost:3000/chatbot",
        { question },
        { withCredentials: true }
      );

      const botResponse = res.data.result || "I couldn't understand that.";
      await typeEffect(botResponse);
    } catch (err) {
      await typeEffect("⚠️ Error: Unable to get response from the server.");
    } finally {
      setLoading(false);
    }
  };

  const typeEffect = async (text) => {
    let display = "";
    for (let i = 0; i < text.length; i++) {
      display += text[i];
      setBotTyping(display);
      await new Promise((resolve) => setTimeout(resolve, 15));
    }
    setChat((prev) => [...prev, { sender: "bot", text }]);
    setBotTyping("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendQuestion();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, botTyping]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-tr from-teal-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-2xl p-6 bg-white border border-gray-200 shadow-2xl rounded-2xl">
        <h2 className="mb-6 text-4xl font-bold text-center text-purple-600">
          🧠 MedBot Assistant
        </h2>

        <div className="p-4 mb-4 overflow-y-auto border shadow-inner h-96 rounded-xl bg-gray-50">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-xl px-4 py-2 max-w-xs text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-200 text-blue-900"
                    : "bg-green-200 text-green-900"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {botTyping && (
            <div className="flex justify-start mb-3">
              <div className="px-4 py-2 text-sm text-green-800 whitespace-pre-wrap bg-green-100 shadow-md rounded-xl animate-pulse">
                {botTyping}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask a medical question..."
            className="flex-1 px-4 py-2 text-sm border outline-none rounded-xl focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={sendQuestion}
            disabled={loading}
            className="px-5 py-2 text-sm text-white bg-purple-600 rounded-xl hover:bg-purple-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
