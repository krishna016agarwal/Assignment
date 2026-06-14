import Volunteer from "../models/Volunteer.js";

export const createVolunteer = async (req, res) => {
  const volunteer = await Volunteer.create({ ...req.body, registeredBy: req.user?._id });
  res.status(201).json({ message: "Volunteer registered successfully", volunteer });
};

export const getMyApplications = async (req, res) => {
  const applications = await Volunteer.find({ registeredBy: req.user._id }).sort("-createdAt");
  res.json(applications);
};

export const getVolunteers = async (req, res) => {
  const { status, search, interestArea } = req.query;
  const query = {};

  if (status && status !== "All") query.status = status;
  if (interestArea && interestArea !== "All") query.interestArea = interestArea;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } }
    ];
  }

  const volunteers = await Volunteer.find(query).sort("-createdAt").populate("registeredBy", "name email");
  res.json(volunteers);
};

export const updateVolunteerStatus = async (req, res) => {
  const { status } = req.body;
  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
  res.json({ message: "Status updated", volunteer });
};

export const deleteVolunteer = async (req, res) => {
  const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
  if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
  res.json({ message: "Volunteer deleted" });
};
