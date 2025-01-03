import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
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

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

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

  const clearChat = () => {
    setChatHistory([]);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const ChatHistory = ({ chatHistory }) => (
    <>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`message ${
            message.type === "user" ? "user-message" : "bot-message"
          }`}
        >
          <div className="message-avatar">
            {message.type === "user" ? "👤" : "🤖"}
          </div>
          <div className="message-text">
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );

  const Loading = ({ isLoading }) => (
    <div>
      {isLoading && (
        <div className="loading-indicator">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isChatOpen && (
        <div className="chat-window open">
          <header>Chatbot</header>
          <div className="chat-history">
            <ChatHistory chatHistory={chatHistory} />
            <Loading isLoading={isLoading} />
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              Send
            </button>
          </div>
          <button className="clear-chat" onClick={clearChat}>
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