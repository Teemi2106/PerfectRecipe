import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import "../CSS/chatbot.css";
import { IoMdSend } from "react-icons/io";

const Chatbot = () => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const chatSectionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chat.trim()) {
      const newMessage = { type: "user", text: chat };
      setMessages([...messages, newMessage]);
      setChat("");

      try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: chat }),
        });

        const data = await response.json();
        const botMessage = { type: "bot", text: data.reply };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error communicating with the backend:", error);
        const errorMessage = {
          type: "bot",
          text: "Error communicating with the server.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  useEffect(() => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="chatbox">
      <Header />
      <main>
        <h1 id="chatTitle">AI ChatBot</h1>
        <section id="chatSection" ref={chatSectionRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.type === "user" ? "user-message" : "bot-message"}
            >
              {msg.text}
            </div>
          ))}
        </section>
        <form id="chatInput" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type Here"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button type="submit" style={{ padding: "0 2vmin" }}>
            <IoMdSend size="5vmin" color="#e70da2" />
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chatbot;
