import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Patient } from "../types/patient";

const PatientDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetch("/dummy.json")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 flex flex-wrap gap-4">
      {patients.map((patient) => (
        <Link key={patient.id} to={`/patients/${patient.id}`}>
          <div className="bg-black text-white border border-gray-300 rounded-lg p-6 w-80 cursor-pointer hover:bg-gray-800">
            <h1 className="text-xl font-medium">{patient.name}</h1>
            <p>Age: {patient.age}</p>
            <p>Weight: {patient.weight}</p>
            <p>Height: {patient.height}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PatientDashboard;
