import express from "express";
import { hasRole, protect } from "../middlewares/authMiddleware.js";
import { addLabReport, getPatients } from "../controller/labController.js";

const router = express.Router();

router.get("/get-patients-lab", protect, hasRole(["lab"]), getPatients);
router.post("/add-lab-report/:id", protect, hasRole(["lab"]), addLabReport);

export default router;
