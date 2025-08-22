import React, { useState, useEffect } from "react";

interface Props {
  patientId: number;
}

const NotePad: React.FC<Props> = ({ patientId }) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem(`patient-note-${patientId}`);
    if (savedNote) setNote(savedNote);
    else setNote("");
  }, [patientId]);

  useEffect(() => {
    localStorage.setItem(`patient-note-${patientId}`, note);
  }, [note, patientId]);

  return (
    <div className="h-[90vh] flex flex-col">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type notes..."
        className="flex-1 w-full p-2 outline-none focus:ring-0"
      ></textarea>
    </div>
  );
};

export default NotePad;
