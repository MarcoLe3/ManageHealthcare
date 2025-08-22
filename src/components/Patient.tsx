import React from "react";
import { Patient } from "../types/patient";

interface Props {
  patient: Patient;
  isFirst?: boolean;
  onClick?: () => void;
}

const PatientCard: React.FC<Props> = ({ patient, isFirst = false, onClick }) => {
  const borderClasses = isFirst
    ? "border-t border-b border-gray-400"
    : "border-b border-gray-400";

  return (
    <div
      className={`${borderClasses} p-4 cursor-pointer font-inter`}
      onClick={onClick}
    >
      <h1 className="text-lg font-sans font-bold">{patient.name}</h1>
      <p>{patient.notes}</p>
      <p className="text-gray-500">{patient["history conditions"]?.join(", ")}</p>
    </div>
  );
};

export default PatientCard;
