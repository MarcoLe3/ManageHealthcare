// PatientDetails.tsx
import React from "react";
import { Patient } from "../types/patient";

interface Props {
  patient: Patient;
}

const PatientDetails: React.FC<Props> = ({ patient }) => {
  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4">{patient.name}</h1>
      <p>Age: {patient.age}</p>
      <p>Weight: {patient.weight}</p>
      <p>Height: {patient.height}</p>
      <p>Gender: {patient.gender}</p>
      <p>Notes: {patient.notes}</p>
      <p>History Conditions: {patient["history conditions"]?.join(", ")}</p>
      <p>Past Medications: {patient.pastMedications?.join(", ")}</p>
    </div>
  );
};

export default PatientDetails;
