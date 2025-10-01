import express from "express";
import { hasRole, protect } from "../middlewares/authMiddleware.js";
import {
  addPatient,
  getPatients,
  getPatient,
  updateBill,
  getDoctors,
} from "../controller/receptionController.js";

const router = express.Router();

router.get(
  "/get-patients-reception",
  protect,
  hasRole(["reception"]),
  getPatients
);
router.get("/get-doctors", protect, hasRole(["reception"]), getDoctors);
router.get(
  "/get-patient-reception/:id",
  protect,
  hasRole(["reception"]),
  getPatient
);
router.post("/add-patient", protect, hasRole(["reception"]), addPatient);
router.put("/update-bill/:id", protect, hasRole(["reception"]), updateBill);

export default router;
