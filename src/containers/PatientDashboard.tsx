// PatientDashboard.tsx
import React, { useEffect, useState } from "react";
import { Patient } from "../types/patient";
import PatientCard from "../components/Patient";
import PatientChat from "../components/PatientChat";
import NotePad from "../components/Button/NoteButton";

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
    <div className="flex gap-6 p-6 w-full h-screen relative overflow-hidden">
      <div className="w-1/5 flex flex-col gap-0">
        <h2 className="text-3xl font-bold font-sans mb-6">Patients</h2>
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => {
              setSelectedPatient(patient);
              setShowNotes(false);
            }}
          />
        ))}
      </div>

      <div
        className={`transition-all duration-300 ${
          showNotes ? "w-2/5" : "w-2/3"
        } flex flex-col`}
      >
        {selectedPatient && (
          <h2 className="text-3xl font-bold font-sans mb-6 self-center">
            {selectedPatient.name}
          </h2>
        )}

        {selectedPatient && (
          <div className="flex-1">
            <PatientChat key={selectedPatient.id} patient={selectedPatient} />
          </div>
        )}
      </div>


      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          showNotes ? "translate-x-0 w-1/3" : "translate-x-full w-1/3"
        }`}
      >
        {selectedPatient && (
          <div className="h-full p-6">
            <NotePad patientId={selectedPatient.id} />
          </div>
        )}
      </div>

      {selectedPatient && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 hover:cursor-pointer z-50"
        >
          {showNotes ? "Close Notes" : "Open Notes"}
        </button>
      )}
    </div>
  );
};

export default PatientDashboard;
