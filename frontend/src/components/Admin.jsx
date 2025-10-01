import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";
import { useAdminStore } from "../store/useAdminStore";
import { Trash2 } from "lucide-react";

const Admin = () => {
  const { getUsers, allUsers, patients, getPatients } = useAdminStore();
  const { user } = useUserStore();

  useEffect(() => {
    getUsers();
    getPatients();
  }, []);

  return (
    <div className="flex flex-col items-center mx-2 md:mx-10 lg:mx-20">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-slate-800 mt-6">{`Welcome, ${user.role} ${user.name}`}</h1>

      {/* Dashboard */}
      <div className="w-full mt-10 border border-slate-200 rounded-2xl shadow-lg p-6 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <Link to={"/register"}>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
              + Add User
            </button>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Users">
            <ListUsers allUsers={allUsers} />
          </Card>
          <Card title="Patients">
            <PatientList patients={patients} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;

function Card({ title, children }) {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-4 bg-gray-50 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-slate-700 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function ListUsers({ allUsers }) {
  const { deleteUser } = useAdminStore();
  if (!Array.isArray(allUsers) || allUsers.length === 0) {
    return <p className="text-gray-500">No users found</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="grid grid-cols-3 bg-gray-100 text-sm font-semibold text-gray-700 px-3 py-2">
        <p>Name</p>
        <p className="text-center">Role</p>
        <p className="text-right">Action</p>
      </div>
      <div className="divide-y divide-gray-200">
        {allUsers.map((user, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <p>{user.name}</p>
            <p className="text-center capitalize">{user.role}</p>
            <div className="flex justify-end">
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                onClick={() => deleteUser(user._id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientList({ patients }) {
  if (!Array.isArray(patients) || patients.length === 0) {
    return <p className="text-gray-500">No patients found</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex justify-between bg-gray-100 text-sm font-semibold text-gray-700 px-5 py-2">
        <span>Name</span>
        <span>Amount</span>
      </div>
      <div className="divide-y divide-gray-200">
        {patients.map((patient, idx) => (
          <div
            key={idx}
            className="flex justify-between px-5   py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <span>{patient.name}</span>
            <span className="font-medium text-gray-800">
              ₹{patient.bill?.totalAmount || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
