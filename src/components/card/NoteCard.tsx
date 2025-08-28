import React, { useState } from "react";

const NoteCard: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.dataTransfer.getData("text/html");
    const text = e.dataTransfer.getData("text/plain");

    if (html) setNotes((prev) => [...prev, html]);
    else if (text) {
      const fallbackBubble = `<div class="px-4 py-2 rounded-lg max-w-[70%] font-instrument bg-gray-700 text-white">${text}</div>`;
      setNotes((prev) => [...prev, fallbackBubble]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-4" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-white">Notes</h2>
      </div>

      <ul className="space-y-2">
        {notes.map((note, i) => (
          <li key={i} className="p-2" dangerouslySetInnerHTML={{ __html: note }} />
        ))}
      </ul>

      <textarea
          className="mt-2 w-full p-2 text-white focus:outline-none resize-none overflow-hidden caret-yellow-500"
          placeholder="Your notes"
          onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "0px";
            target.style.height = target.scrollHeight + "px";
          }}
        />
    </div>
  );
};

export default NoteCard;