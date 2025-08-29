import React, { useState, useRef, useEffect } from "react";
import { Patient } from "../types/patient";
import { io, Socket } from "socket.io-client";

let socket: Socket;

interface Props {
  patient: Patient;
}

interface Message {
  text: string;
  sender: "me" | "patient";
}

const PatientChat: React.FC<Props> = ({ patient }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Mr Stark i dont feel so good", sender: "patient" },
    { text: "u got me :)", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) {
      socket = io({path: "/api/socketio"});
    };

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const uploadFile = () => {
    
  }

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMsg: Message = { text: input, sender: "me" };
    setMessages((prev) => [...prev, newMsg]);

    socket.emit("message", newMsg);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
  <div className="flex flex-col h-auto font-instrument">
    {/* Messages (scrollable) */}
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-lg max-w-[70%] font-instrument ${
              msg.sender === "me"
                ? "bg-[#1E6EF4] text-white"
                : "bg-[#3A3A3C] text-white"
            }`}
            draggable={msg.sender === "patient"}
            onDragStart={(e) => {
              const bubbleClasses =
                msg.sender === "me"
                  ? "px-4 py-2 rounded-lg max-w-[40%] font-instrument bg-[#1E6EF4] text-white"
                  : "px-4 py-2 rounded-lg max-w-[40%] font-instrument bg-[#3A3A3C] text-white";

              const bubbleHTML = `<div class="${bubbleClasses}">${msg.text}</div>`;

              e.dataTransfer.setData("text/html", bubbleHTML);
              e.dataTransfer.setData("text/plain", msg.text);
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>

    <div className="p-4 flex items-center gap-2">
      <input
        type="text"
        className="flex-1 p-3 rounded-full border border-[#3A3A3C] focus:outline-none font-instrument text-white bg-[#2C2C2E]"
        placeholder="Type Message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button 
        className="p-3 bg-[#2C2C2E] hover:cursor-pointer rounded-full flex items-center justify-center"
        onClick={uploadFile}>
        <img className="w-4 h-4" src="/plus.png" alt="upload" />
      </button>
    </div>
  </div>
);
};

export default PatientChat;
