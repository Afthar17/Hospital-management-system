import React, { useEffect } from "react";
import { useDoctorStore } from "../store/useDoctorStore.js";

const DoctorLabReports = () => {
  const { labReports, getLabReports, isLoadingReports } = useDoctorStore();

  useEffect(() => {
    getLabReports();
  }, []);

  if (isLoadingReports)
    return <p className="text-gray-500">Loading reports...</p>;

  if (labReports.length === 0) {
    return (
      <p className="text-gray-500 text-center justify-center mt-20">
        No lab reports found.
      </p>
    );
  }

  return (
    <div className="mx-4 md:mx-10 lg:mx-20 mt-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Lab Reports</h1>

      <div className="space-y-4">
        {labReports.map((report) => (
          <div
            key={report._id}
            className="border border-gray-200 rounded-xl shadow-sm bg-white p-4"
          >
            <p className="font-semibold text-slate-700">
              Patient: {report.patientId?.name} ({report.patientId?.age} yrs,{" "}
              {report.patientId?.gender})
            </p>
            <p className="text-sm text-gray-600">
              Uploaded by: {report.uploadedBy?.name} ({report.uploadedBy?.role})
            </p>
            <a
              href={report.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-emerald-600 hover:underline text-sm"
            >
              View Report
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorLabReports;
