import { useState, useEffect, use } from "react";

interface ChatSummaryProps {
  patientMessages: string;
}


const ChatSummary: React.FC<ChatSummaryProps> = ({ patientMessages }) => {
    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
        const fetchSummary = async () => {
            if(!patientMessages) return;

            const res = await fetch("/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: patientMessages }),
            });

            const data = await res.json();
            setSummary(data.summary);
        };

        fetchSummary();
    }, [patientMessages]);

    return (
        <div className="p-4 rounded-lg ">
            <h2 className="text-white text-lg font-semibold mb-2">Chat Summary</h2>
            <p className="text-white">{summary || "Generating summary"}</p>
        </div>
    );
};

export default ChatSummary;