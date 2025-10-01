import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDoctorStore } from "../store/useDoctorStore.js";

const PatientDetails = () => {
  const { id } = useParams();
  const { selectedPatient, getPatient, addPrescription, isLoading } =
    useDoctorStore();
  const [newPrescription, setNewPrescription] = useState("");

  useEffect(() => {
    getPatient(id);
  }, [id]);

  useEffect(() => {
    console.log("Selected Patient:", selectedPatient);
  }, [selectedPatient]);

  const handleAddPrescription = (e) => {
    e.preventDefault();
    if (!newPrescription.trim()) return;
    addPrescription(id, newPrescription);
    setNewPrescription("");
  };

  if (isLoading || !selectedPatient) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col mx-4 md:mx-10 lg:mx-20">
      <h1 className="text-2xl font-bold text-slate-800 mt-6">
        Patient: {selectedPatient?.name}
      </h1>

      {/* Prescriptions */}
      <div className="mt-6 border border-gray-200 rounded-xl shadow-sm bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-700 mb-3">
          Prescriptions
        </h2>
        {selectedPatient?.prescriptions?.length > 0 ? (
          <ul>
            {selectedPatient.prescriptions.map((pr, idx) => (
              <li key={idx}>{pr}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No prescriptions yet.</p>
        )}

        {/* Add prescription */}
        <form
          onSubmit={handleAddPrescription}
          className="mt-4 flex gap-2 items-center"
        >
          <input
            type="text"
            value={newPrescription}
            onChange={(e) => setNewPrescription(e.target.value)}
            placeholder="Enter prescription"
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-emerald-700 transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientDetails;
