import React from "react";
import RecordCard from "../card/RecordCard";
import NoteCard from "../card/NoteCard"

interface Props {
  patientId: number;
}

const NotePad: React.FC<Props> = ({ patientId }) => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-black rounded-lg">
      <RecordCard />
      <NoteCard />
    </div>
  );
};

export default NotePad;
