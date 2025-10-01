import React, { useEffect } from "react";
import { useDoctorStore } from "../store/useDoctorStore";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";

const Doctor = () => {
  const { user } = useUserStore();
  const { patients, getPatients, isLoading } = useDoctorStore();

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div className="flex flex-col items-center mx-2 md:mx-10 lg:mx-20">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-slate-800 mt-6">{`Welcome, ${user.role} ${user.name}`}</h1>

      {/* Dashboard */}
      <div className="w-full flex justify-center mt-10">
        <div className="w-full max-w-3xl border border-slate-200 rounded-2xl shadow-lg p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <Link to={"/doctor/reports"}>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
                Get Reports
              </button>
            </Link>
          </div>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : patients.length === 0 ? (
            <p className="text-gray-500">No patients found</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gray-100 text-sm font-bold text-gray-700 px-3 py-2">
                <p>Name</p>
                <p className="text-center">Age</p>
                <p className="text-right">Prescriptions</p>
              </div>

              {/* Patient Rows */}
              <div className="divide-y divide-gray-200">
                {patients.map((p) => (
                  <Link
                    key={p._id}
                    to={`/doctor/patient/${p._id}`}
                    className="grid grid-cols-3 items-center px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                  >
                    {/* Name */}
                    <p>{p.name}</p>

                    {/* Age */}
                    <p className="text-center">{p.age}</p>

                    {/* Prescriptions preview */}
                    <p className="text-right text-emerald-600">
                      {p.prescriptions?.length > 0
                        ? `${p.prescriptions.length} added`
                        : "None"}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
