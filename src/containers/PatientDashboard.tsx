// PatientDashboard.tsx
import React, { useEffect, useState } from "react";
import { Patient } from "../types/patient";
import PatientCard from "../components/Patient";
import PatientDetails from "../components/PatientDetails";
import NotePad from "../components/Button/NoteButton"; // renamed for clarity

const PatientDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    fetch("/dummy.json")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex gap-6 p-6 w-full h-screen">
      {/* Left column: Patients list */}
      <div className="w-1/3 flex flex-col gap-0">
        {patients.map((patient, index) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            isFirst={index === 0}
            onClick={() => setSelectedPatient(patient)}
          />
        ))}
      </div>

      {/* Middle column: PatientDetails */}
      <div
        className={`p-6 transition-all duration-300 ${
          showNotes ? "w-1/3" : "w-2/3"
        }`}
      >
        {selectedPatient ? (
          <PatientDetails key={selectedPatient.id} patient={selectedPatient} />
        ) : (
          <p>Select a patient to see details</p>
        )}
      </div>

      {/* Right column: Notes */}
      {showNotes && selectedPatient && (
        <div className="w-1/3 p-6">
          <NotePad patientId={selectedPatient.id} />
        </div>
      )}

      {/* Floating button - always top right */}
      {selectedPatient && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          {showNotes ? "Close Notes" : "Open Notes"}
        </button>
      )}
    </div>
  );
};

export default PatientDashboard;
