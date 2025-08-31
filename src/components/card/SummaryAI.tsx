import React, { useState } from "react";
import PatientChat from "../sections/PatientChat";
import ChatSummary from "../card/ChatSummary";
import { Message } from "../../types/patient";

const SummaryAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const patientMessages = messages
    .filter((msg) => msg.sender === "patient")
    .map((msg) => msg.text)
    .join(" ");

  return (
    <div>
      {!showSummary ? (
        <>
          <PatientChat messages={messages} setMessages={setMessages} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
            onClick={() => setShowSummary(true)}
          >
            Summarize Chat
          </button>
        </>
      ) : (
        <ChatSummary patientMessages={patientMessages} />
      )}
    </div>
  );
};

export default SummaryAi;
