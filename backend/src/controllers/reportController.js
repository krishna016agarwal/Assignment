import Volunteer from "../models/Volunteer.js";
import User from "../models/User.js";

const groupCount = async (field) => {
  return Volunteer.aggregate([
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

export const getDashboardStats = async (req, res) => {
  const [totalVolunteers, totalUsers, pending, approved, rejected, byArea, byCity, byStatus, monthly] = await Promise.all([
    Volunteer.countDocuments(),
    User.countDocuments(),
    Volunteer.countDocuments({ status: "Pending" }),
    Volunteer.countDocuments({ status: "Approved" }),
    Volunteer.countDocuments({ status: "Rejected" }),
    groupCount("interestArea"),
    groupCount("city"),
    groupCount("status"),
    Volunteer.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 12 }
    ])
  ]);

  res.json({
    cards: { totalVolunteers, totalUsers, pending, approved, rejected },
    byArea,
    byCity,
    byStatus,
    monthly
  });
};

export const exportVolunteersJSON = async (req, res) => {
  const volunteers = await Volunteer.find().sort("-createdAt").lean();
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=nayepankh-volunteers-report.json");
  res.json(volunteers);
};
