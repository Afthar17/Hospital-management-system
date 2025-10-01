import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import receptionRoutes from "./routes/receptionRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/reception", receptionRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/lab", labRoutes);

// static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    console.log(__dirname);
  });
}

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
