// NotePad.tsx
import React, { useState, useEffect } from "react";

interface Props {
  patientId: number;
}

const NotePad: React.FC<Props> = ({ patientId }) => {
  const [note, setNote] = useState("");

  // Load note for this patient
  useEffect(() => {
    const savedNote = localStorage.getItem(`patient-note-${patientId}`);
    if (savedNote) setNote(savedNote);
    else setNote(""); // reset if no saved note
  }, [patientId]);

  // Save note for this patient
  useEffect(() => {
    localStorage.setItem(`patient-note-${patientId}`, note);
  }, [note, patientId]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2">Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type notes..."
        className="flex-1 w-full p-2 border rounded resize-none"
      />
    </div>
  );
};

export default NotePad;
