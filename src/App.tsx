import React, { useState } from "react";
import PatientDashboard from "./containers/PatientDashboard";
import PatientDetails from "./components/PatientDetails";
import { Patient } from "./types/patient";

const App: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="flex">
      <PatientDashboard onSelectPatient={setSelectedPatient} />
      {selectedPatient && <PatientDetails patient={selectedPatient} />}
    </div>
  );
};

export default App;
