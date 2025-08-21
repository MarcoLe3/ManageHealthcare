import React from "react";
import { Patient } from "../types/patient";

interface Props {
  patient: Patient;
  onClick: (patient: Patient) => void;
}

const PatientCard: React.FC<Props> = ({ patient, onClick }) => {
  return (
    <div
      className="bg-black text-white border border-gray-300 rounded-lg p-4 w-64 cursor-pointer hover:bg-gray-800"
      onClick={() => onClick(patient)}
    >
      <h1 className="text-lg font-medium">{patient.name}</h1>
      <p>Age: {patient.age}</p>
      <p>Weight: {patient.weight} lbs</p>
      <p>Height: {patient.height} in</p>
    </div>
  );
};

export default PatientCard;
