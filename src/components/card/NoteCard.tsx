import React, { useState } from "react";

const NoteCard: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    if (text) setNotes((prev) => [...prev, text]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // required to allow drop
  };

  return (
    <div
      className="p-4 w-full max-w-md bg-white rounded-lg shadow-lg min-h-[200px]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="font-bold mb-2">Notes</h2>
      {notes.length === 0 && <p>Drag messages here</p>}
      <ul className="space-y-1">
        {notes.map((note, i) => (
          <li key={i} className="border p-2 rounded">{note}</li>
        ))}
      </ul>
      <textarea
        className="mt-2 w-full p-2 border rounded resize-none"
        placeholder="Write your own notes..."
      />
    </div>
  );
};

export default NoteCard;
