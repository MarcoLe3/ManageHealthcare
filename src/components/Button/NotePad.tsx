import React from "react";
import RecordCard from "../card/RecordCard";

interface Props {
  patientId: number;
}

const NotePad: React.FC<Props> = ({ patientId }) => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-50 rounded-lg">
      <RecordCard />
    </div>
  );
};

export default NotePad;
