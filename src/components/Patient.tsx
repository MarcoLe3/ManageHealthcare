import React from "react";
import { Patient } from "../types/patient";

interface Props {
  patient: Patient;
  onClick?: () => void;
}

const PatientCard: React.FC<Props> = ({ patient, onClick }) => {
  return (
    <div
      className="p-4 cursor-pointer font-inter flex items-center gap-4"
      onClick={onClick}
    >
      <img
        src="/dummy_avatar.png"
        alt="Avatar"
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <h1 className="text-lg font-sans text-white font-semibold">{patient.name}</h1>
        <p className="text-white">{patient.notes}</p>
        <p className="text-gray-400">{patient["history conditions"]?.join(", ")}</p>
      </div>
    </div>
  );
};

export default PatientCard;
