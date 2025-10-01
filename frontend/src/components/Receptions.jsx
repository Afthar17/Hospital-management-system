import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useReceptionStore } from "../store/useReceptionStore";
import { Link } from "react-router-dom";
import { CheckmarkIcon } from "react-hot-toast";

const Receptions = () => {
  const { user } = useUserStore();
  const { patients, getPatients, updateBill } = useReceptionStore();

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  if (!user) return <div>You are not authenticated</div>;

  return (
    <div className="flex flex-col mx-2 md:mx-10 lg:mx-20">
      {/* Welcome */}
      <h1 className="text-3xl text-center font-bold text-slate-800 mt-6">
        Welcome Receptionist, {user.name}
      </h1>

      {/* Actions */}
      <div className="flex justify-between gap-4 mt-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <Link
          to="/add-patient"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          + Add Patient
        </Link>
      </div>

      {/* Patients with Bill Status */}
      <div className="mt-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          Patients & Bills
        </h2>
        {patients.length === 0 ? (
          <p className="text-gray-500">No patients added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Contact No
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition border-b"
                  >
                    <td className="p-3 text-sm text-gray-700">{p.name}</td>
                    <td className="p-3 text-sm text-gray-700">{p.contactNo}</td>
                    <td className="p-3 text-sm font-semibold text-gray-800">
                      ₹{p.bill?.totalAmount || 0}
                    </td>
                    <td className="p-3 text-center">
                      {p.bill?.paidStatus === "paid" ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                          Paid
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                          Unpaid
                        </span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="p-3 text-center flex flex-col gap-2 items-center justify-center">
                      {/* Mark as Paid */}
                      {p.bill?.paidStatus !== "paid" && (
                        <>
                          {/* Show full button on md+ screens */}
                          <button
                            onClick={() => updateBill(p._id)}
                            className="hidden md:inline-block px-4 py-1 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition"
                          >
                            Mark as Paid
                          </button>

                          <button
                            onClick={() => updateBill(p._id)}
                            className="md:hidden bg-white text-white p-2 rounded-full hover:bg-emerald-700 transition"
                            title="Mark as Paid"
                          >
                            <CheckmarkIcon />
                          </button>
                        </>
                      )}

                      {p.bill?.invoiceUrl && (
                        <a
                          href={p.bill.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 text-xs hover:underline"
                        >
                          View Invoice
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Receptions;
