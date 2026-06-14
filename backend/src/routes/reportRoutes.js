import express from "express";
import { exportVolunteersJSON, getDashboardStats } from "../controllers/reportController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/volunteers-json", protect, adminOnly, exportVolunteersJSON);
export default router;
