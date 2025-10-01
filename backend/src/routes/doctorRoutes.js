import express from "express";
import { hasRole, protect } from "../middlewares/authMiddleware.js";
import {
  getPatients,
  getPatient,
  addPrescription,
  getDoctorLabReports,
} from "../controller/doctorController.js";

const router = express.Router();

router.get("/get-patients-doctor", protect, hasRole(["doctor"]), getPatients);
router.get("/get-patient/:id", protect, hasRole(["doctor"]), getPatient);
router.get(
  "/get-lab-reports",
  protect,
  hasRole(["doctor"]),
  getDoctorLabReports
);
router.post(
  "/add-prescription/:id",
  protect,
  hasRole(["doctor"]),
  addPrescription
);

export default router;
