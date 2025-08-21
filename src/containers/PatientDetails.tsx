import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types/patient";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetch("/dummy.json")
      .then((res) => res.json())
      .then((data: Patient[]) => {
        const found = data.find((p) => p.id === Number(id));
        setPatient(found || null);
      })
      .catch(console.error);
  }, [id]);

  if (!patient) return <p>Loading patient...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{patient.name}</h1>
      <p>Age: {patient.age}</p>
      <p>Weight: {patient.weight}</p>
      <p>Height: {patient.height}</p>
      <p>Gender: {patient.gender}</p>
      <p>Notes: {patient.notes}</p>
      <p>History Conditions: {patient.historyConditions?.join(", ")}</p>
      <p>Past Medications: {patient.pastMedications?.join(", ")}</p>
    </div>
  );
};

export default PatientDetails;
