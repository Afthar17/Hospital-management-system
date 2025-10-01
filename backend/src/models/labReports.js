import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const LabReport = mongoose.model("LabReport", labReportSchema);
export default LabReport;
