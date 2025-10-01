import Patient from "../models/patientModel.js";
import LabReports from "../models/labReports.js";

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ consultingDoctor: req.user._id });
    if (!patients) {
      return res.status(404).json({ message: "No patients found" });
    }
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error.message);
  }
};

export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({
      _id: id,
      consultingDoctor: req.user._id,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error.message);
  }
};

export const addPrescription = async (req, res) => {
  try {
    const { prescription } = req.body;
    const { id } = req.params;

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.prescriptions.push(prescription);
    await patient.save();

    const updatedPatient = await Patient.findById(id);

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.error(error.message);
  }
};

export const getDoctorLabReports = async (req, res) => {
  try {
    const patients = await Patient.find({
      consultingDoctor: req.user._id,
    }).select("_id");

    const patientIds = patients.map((p) => p._id);

    // Fetch lab reports for those patients
    const reports = await LabReports.find({ patientId: { $in: patientIds } })
      .populate("patientId", "name age gender") // populate patient basic info
      .populate("uploadedBy", "name role"); // populate who uploaded

    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch lab reports" });
  }
};
