import React, { useState, useRef, useEffect } from "react";
import { Patient } from "../types/patient";

interface Props {
  patient: Patient;
}

interface Message {
  text: string;
  sender: "me" | "patient";
}

const PatientChat: React.FC<Props> = ({ patient }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How are you feeling today?", sender: "patient" },
    { text: "I'm feeling better, thank you.", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { text: input, sender: "me" }]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-full font-instrument">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] font-instrument ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
                draggable={msg.sender === "patient"}
                onDragStart={(e) => {
                const bubbleClasses =
                  msg.sender === "me"
                    ? "px-4 py-2 rounded-lg max-w-[70%] font-instrument bg-blue-500 text-white"
                    : "px-4 py-2 rounded-lg max-w-[70%] font-instrument bg-gray-700 text-white";

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

      {/* Input */}
      <div className="p-4">
        <input
          type="text"
          className="w-full p-3 rounded-full border border-[#aeaeb2] focus:outline-none font-instrument text-gray-400"
          placeholder="Type Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default PatientChat;
