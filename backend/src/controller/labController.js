import { generateLabReport } from "../lib/labreport.js";
import Patient from "../models/patientModel.js";
import LabReport from "../models/labReports.js";

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }

    res.status(200).json({ patients });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const addLabReport = async (req, res) => {
  try {
    const { pressure, temperature } = req.body;
    const { id } = req.params;

    if (!pressure || !temperature) {
      return res
        .status(400)
        .json({ message: "Pressure and temperature are required" });
    }

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const uploadInfo = await generateLabReport(patient, pressure, temperature);

    // Save report record
    const report = new LabReport({
      patientId: patient._id,
      fileUrl: uploadInfo.viewUrl, // store viewable link
      uploadedBy: req.user._id,
    });
    await report.save();

    res.status(200).json({
      pdfUrl: uploadInfo.viewUrl, // for frontend to view in browser
      downloadUrl: uploadInfo.downloadUrl, // optional direct download
      report,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
