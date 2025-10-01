import { generateInvoice } from "../lib/invoice.js";
import Billing from "../models/billModel.js";
import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";

export const addPatient = async (req, res) => {
  try {
    const { name, age, gender, contactNo, address, consultingDoctor, amount } =
      req.body;
    if (
      !name ||
      !age ||
      !gender ||
      !contactNo ||
      !address ||
      !consultingDoctor
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const patient = await Patient.create({
      name,
      age,
      gender,
      contactNo,
      address,
      consultingDoctor,
    });

    const bill = await Billing.create({
      patient: patient._id,
      totalAmount: amount,
    });

    const populatedPatient = await Patient.findById(patient._id).populate(
      "consultingDoctor",
      "name"
    );

    const invoiceUrl = await generateInvoice(populatedPatient, bill);

    bill.invoiceUrl = invoiceUrl;
    await bill.save();

    res.status(201).json({
      message: "Patient added successfully",
      patient,
      bill,
      invoiceUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().lean();

    // Attach bill info for each patient
    const patientsWithBills = await Promise.all(
      patients.map(async (p) => {
        const bill = await Billing.findOne({ patient: p._id });
        return { ...p, bill };
      })
    );

    res.status(200).json(patientsWithBills);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const bills = await Billing.find({ patient: id });
    if (!bills) {
      return res.status(404).json({ message: "Bills not found" });
    }
    res.status(200).json({ patient, bills });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error.message);
  }
};

export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Billing.findOneAndUpdate(
      { patient: id },
      { paidStatus: "paid" },
      { new: true }
    );

    if (!bill) {
      return res
        .status(404)
        .json({ message: "Bill not found for this patient" });
    }

    res.status(200).json({ message: "Bill updated successfully", bill });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    if (!doctors) {
      return res.status(404).json({ message: "No doctors found" });
    }
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error.message);
  }
};
