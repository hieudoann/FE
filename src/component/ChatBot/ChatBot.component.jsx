import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown"; // For rendering markdown messages
import './ChatBot.component.css';

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatEndRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Initialize your Gemini API
  const genAI = new GoogleGenerativeAI("AIzaSyBW0wuEml-AWB_JGj2xXAbWDH0TQazBC5A");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: await response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  // ChatHistory Component (Inline)
  const ChatHistory = ({ chatHistory }) => (
    <>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`flex items-start py-2 px-4 rounded-lg ${
            message.type === "user"
              ? "bg-gray-100 text-gray-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {message.type === "user" && (
            <span className="mr-2 font-bold text-gray-600">You:</span>
          )}
          <div>
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );

  // Loading Component (Inline)
  const Loading = ({ isLoading }) => (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center mt-2">
          <div className="spinner-border text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isChatOpen && (
        <div className={`chat-window ${isChatOpen ? "open" : ""}`}>
          <h2 className="text-xl font-bold mb-2 p-4">Chatbot</h2>
          <div className="flex-1 overflow-auto p-4">
            <ChatHistory chatHistory={chatHistory} />
            <Loading isLoading={isLoading} />
            <div ref={chatEndRef} />
          </div>
          <div className="flex p-4">
            <input
              type="text"
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
              onClick={sendMessage}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
          <button
            className="mt-2 block px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none mx-auto mb-4"
            onClick={clearChat}
          >
            Clear Chat
          </button>
        </div>
      )}
      <div className="chat-bubble" onClick={toggleChat}>
        💬
      </div>
    </>
  );
};

export default ChatBot;
