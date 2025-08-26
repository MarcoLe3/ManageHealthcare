import React, { useEffect, useState } from "react";
import { Patient } from "../types/patient";
import PatientCard from "../components/Patient";
import PatientChat from "../components/PatientChat";
import NotePad from "../components/Button/NotePad";

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
    <div className="flex w-full h-screen relative bg-[#1c1c1e]">
      <div className="flex flex-col w-1/5 bg-[#242426] rounded-lg overflow-hidden">
        <h2 className="text-3xl font-semibold font-sans mb-6 text-white px-4 pt-4">
          Patients
        </h2>
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => {
              setSelectedPatient(patient);
              setShowNotes(false);
            }}
            className={`
             
              ${selectedPatient?.id === patient.id ? "bg-[#3A3A3C] rounded-lg scale-93 " : "" }
            `}
          />
        ))}
      </div>

      <div
        className={`flex flex-col transition-all duration-300 ${
          showNotes ? "w-14/30" : "w-7/9"
        }`}
      >
        {selectedPatient && (
          <>
            <h2 className="text-l font-medium font-sans mb-6 self-center text-gray-400">
              {selectedPatient.name}
            </h2>
            <div className="flex-1">
              <PatientChat key={selectedPatient.id} patient={selectedPatient} />
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-1/3 transform transition-transform duration-300 ease-in-out z-40 ${
          showNotes ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedPatient && <NotePad patientId={selectedPatient.id} />}
      </div>

      {selectedPatient && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="fixed top-4 right-4 px-2 py-2 rounded-lg hover:bg-[#48484A] hover:cursor-pointer z-50"
        >
          {showNotes ? (
            <img src="/note_icon.png" alt="Close Notes" className="w-6 h-6" />
          ) : (
            <img src="/note_icon.png" alt="Open Notes" className="w-6 h-6" />
          )}
        </button>

      )}
    </div>
  );
};

export default PatientDashboard;
