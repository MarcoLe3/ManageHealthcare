import React from "react";
import RecordCard from "../card/RecordCard";
import NoteCard from "../card/NoteCard"
import SummaryAi from "../card/SummaryAI";

interface Props {
  patientId: number;
}

const NotePad: React.FC<Props> = ({ patientId }) => {
  return (
    <div className="flex flex-col h-full p-4 bg-[#242426] rounded-lg">
      < SummaryAi/>
      <RecordCard />
      {/* <NoteCard /> */}
    </div>
  );
};

export default NotePad;
