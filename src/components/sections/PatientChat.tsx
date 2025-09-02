import React, { useState, useRef, useEffect } from "react";
import { Patient } from "../../types/patient";
import { io, Socket } from "socket.io-client";

let socket: Socket;

interface Props {
  patient: Patient;
}

interface Message {
  text?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  sender: "me" | "patient";
}

const PatientChat: React.FC<Props> = ({ patient }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Mr Stark i dont feel so good", sender: "patient" },
    { text: "u got me :)", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null)

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
    file.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const filesArray = Array.from(e.target.files);

  filesArray.forEach((file) => {
    const fileUrl = URL.createObjectURL(file);

    const newMsg: Message = {
      fileUrl,
      fileName: file.name,
      fileType: file.type,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMsg]);
    socket.emit("message", newMsg);
  });

  e.target.value = "";
};

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
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`px-4 py-2 rounded-lg max-w-[70%] font-instrument ${
              msg.sender === "me"
                ? "bg-[#1E6EF4] text-white"
                : "bg-[#3A3A3C] text-white"
            }`}
          >
            {msg.text && <p>{msg.text}</p>}

            {msg.fileUrl && msg.fileType?.startsWith("image/") && (
              <img
                src={msg.fileUrl}
                alt={msg.fileName}
                className="max-w-[200px] rounded-lg mt-2"
              />
            )}

            {msg.fileUrl && msg.fileType === "application/pdf" && (
              <a
                href={msg.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline mt-2 block"
              >
                {msg.fileName}
              </a>
            )}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>

    <div className="p-4 flex items-center gap-2 bg-[#1C1C1E]">
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
        onClick={uploadFile}
      >
        <img className="w-4 h-4" src="/plus.png" alt="upload" />
      </button>
      <input
        type="file"
        ref={file}
        className="hidden"
        multiple
        accept="image/*,.pdf"
        onChange={handleFileChange}
      />
    </div>
  </div>
);
};

export default PatientChat;
