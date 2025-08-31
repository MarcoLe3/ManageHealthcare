import React, { useEffect, useState } from "react";
import { Patient } from "../types/patient";
import PatientCard from "../components/sections/PatientUser";
import PatientChat from "../components/sections/PatientChat";
import NotePad from "../components/sections/NotePad";
import NoteButton from "../components/Button/NoteButton"

const PatientDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/dummy.json");
        const data = await res.json();
        setPatients(data);
      } catch(error) {
        console.log(error)
      }
    }

    fetchPatients();
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
             
              ${selectedPatient?.id === patient.id ? "bg-[#3A3A3C] rounded-lg scale-95 " : "" }
            `}
          />
        ))}
      </div>

      <div
        className={`flex flex-col transition-all duration-300 ${
          showNotes ? "w-14/30" : "w-2/3"
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

      {selectedPatient && ( <NoteButton onClick={() => setShowNotes(!showNotes)}/>
      )}
    </div>
  );
};

export default PatientDashboard;
