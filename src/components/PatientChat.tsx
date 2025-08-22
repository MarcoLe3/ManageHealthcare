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

  return (
    <div className="flex flex-col h-full font-instrument">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-[70%] font-instrument ${
              msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="w-full p-3 pr-12 rounded-full border border-[#aeaeb2] focus:outline-none font-instrument placeholder:font-instrument"
        placeholder="Type Message"
      />
    </div>
  );
};

export default PatientChat;
