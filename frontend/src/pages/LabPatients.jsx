// pages/LabPatients.jsx
import React, { useEffect, useState } from "react";
import { useLabStore } from "../store/useLabStore";

const LabPatients = () => {
  const { patients, getPatients, addLabReport, isLoading, reportUrl } =
    useLabStore();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [pressure, setPressure] = useState("");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  useEffect(() => {
    console.log(patients);
  }, [patients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    await addLabReport(selectedPatient._id, {
      pressure,
      temperature,
    });

    setPressure("");
    setTemperature("");
  };

  return (
    <div className="mx-4 md:mx-10 lg:mx-20 mt-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Lab Panel</h1>

      {/* Patients list */}
      {isLoading ? (
        <p className="text-gray-500">Loading patients...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="space-y-4">
          {patients.map((p) => (
            <div
              key={p._id}
              className={`border p-4 rounded-lg shadow-sm cursor-pointer ${
                selectedPatient?._id === p._id
                  ? "bg-emerald-50 border-emerald-300"
                  : "bg-white"
              }`}
              onClick={() => setSelectedPatient(p)}
            >
              <p className="font-semibold">
                {p.name} ({p.age}, {p.gender})
              </p>
              <p className="text-gray-600 text-sm">
                Prescriptions: {p.prescriptions?.length || 0}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Report generation form */}
      {selectedPatient && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 border rounded-xl p-4 bg-white shadow-md"
        >
          <h2 className="text-lg font-semibold mb-3">
            Generate Report for {selectedPatient.name}
          </h2>

          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
              placeholder="Enter Pressure"
              className="flex-1 border rounded-md px-3 py-2 text-sm"
              required
            />
            <input
              type="text"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Enter Temperature"
              className="flex-1 border rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
          >
            Generate Report
          </button>
        </form>
      )}

      {/* Generated report link */}
      {reportUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Report generated successfully:
          </p>
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            View Report
          </a>
        </div>
      )}
    </div>
  );
};

export default LabPatients;
