import express from "express";
import {
  createVolunteer,
  deleteVolunteer,
  getMyApplications,
  getVolunteers,
  updateVolunteerStatus
} from "../controllers/volunteerController.js";
import { adminOnly, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { volunteerSchema } from "../utils/validators.js";

const router = express.Router();
router.post("/", protect, validate(volunteerSchema), createVolunteer);
router.get("/my", protect, getMyApplications);
router.get("/", protect, adminOnly, getVolunteers);
router.patch("/:id/status", protect, adminOnly, updateVolunteerStatus);
router.delete("/:id", protect, adminOnly, deleteVolunteer);
export default router;
