import React, { useState, useEffect } from "react";
import { useReceptionStore } from "../store/useReceptionStore";

const AddPatient = () => {
  const { addPatient, getDoctors, doctors, loading } = useReceptionStore();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contactNo: "",
    address: "",
    consultingDoctor: "",
    amount: "",
  });

  useEffect(() => {
    getDoctors(); // fetch doctors on mount
  }, [getDoctors]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatient(formData);
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add New Patient
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact No
            </label>
            <input
              type="text"
              name="contactNo"
              required
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Doctor & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Consulting Doctor
              </label>
              <select
                name="consultingDoctor"
                required
                value={formData.consultingDoctor}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bill Amount
              </label>
              <input
                type="number"
                name="amount"
                required
                value={formData.amount}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 disabled:opacity-50 transition"
          >
            {loading ? "Adding..." : "Add Patient"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
