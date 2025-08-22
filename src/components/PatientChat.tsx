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
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] ${
                msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type Message"
          className="flex-1 p-2 border rounded"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PatientChat;
