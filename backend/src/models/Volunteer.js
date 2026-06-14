import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 14, max: 80 },
    gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"], default: "Prefer not to say" },
    interestArea: {
      type: String,
      enum: ["Education", "Fundraising", "Social Media", "Field Work", "Events", "Content", "Operations"],
      required: true
    },
    availability: { type: String, enum: ["Weekdays", "Weekends", "Flexible"], default: "Flexible" },
    skills: [{ type: String, trim: true }],
    motivation: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", volunteerSchema);
