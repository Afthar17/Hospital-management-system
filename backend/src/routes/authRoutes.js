import express from "express";
import { hasRole, protect } from "../middlewares/authMiddleware.js";
import {
  checkAuth,
  deleteUser,
  getPatientsAdmin,
  getUsers,
  login,
  logout,
  register,
  signUp,
} from "../controller/authController.js";

const router = express.Router();

router.get("/get-users", protect, hasRole(["admin"]), getUsers);
router.get("/check-auth", protect, checkAuth);
router.get("/get-patients-admin", protect, getPatientsAdmin);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/register", protect, hasRole(["admin"]), register);
router.post("/logout", logout);
router.delete(
  "/admin/delete-user/:id",
  protect,
  hasRole(["admin"]),
  deleteUser
);

export default router;
