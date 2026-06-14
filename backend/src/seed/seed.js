import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Volunteer from "../models/Volunteer.js";

dotenv.config();

const cities = ["Delhi", "Mumbai", "Jaipur", "Lucknow", "Pune", "Bhopal", "Kolkata", "Noida", "Gurugram", "Indore"];
const states = ["Delhi", "Maharashtra", "Rajasthan", "Uttar Pradesh", "Maharashtra", "Madhya Pradesh", "West Bengal", "Uttar Pradesh", "Haryana", "Madhya Pradesh"];
const areas = ["Education", "Fundraising", "Social Media", "Field Work", "Events", "Content", "Operations"];
const statuses = ["Pending", "Approved", "Rejected"];
const names = ["Aarav Sharma", "Diya Mehta", "Krishna Agarwal", "Ananya Singh", "Kabir Khan", "Riya Verma", "Ishaan Gupta", "Meera Joshi", "Arjun Nair", "Sara Ali", "Vivaan Rao", "Nisha Jain", "Aditya Bose", "Tanya Kapoor", "Rohan Das", "Priya Menon", "Yash Saini", "Kavya Bansal"];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const runSeed = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("Please add MONGO_URI in backend/.env first");
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Volunteer.deleteMany();

    const admin = await User.create({
      name: "Admin NayePankh",
      email: "admin@nayepankh.org",
      password: "admin123",
      role: "admin",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Admin"
    });

    const users = [];
    for (let i = 0; i < 8; i++) {
      users.push(
        await User.create({
          name: names[i],
          email: `volunteer${i + 1}@demo.com`,
          password: "password123",
          role: "volunteer",
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(names[i])}`
        })
      );
    }

    const volunteers = Array.from({ length: 45 }).map((_, i) => {
      const cityIndex = Math.floor(Math.random() * cities.length);
      const fullName = names[i % names.length];
      return {
        fullName,
        email: `${fullName.toLowerCase().replaceAll(" ", ".")}${i}@mail.com`,
        phone: `98765${String(10000 + i).slice(0, 5)}`,
        city: cities[cityIndex],
        state: states[cityIndex],
        age: 18 + (i % 16),
        gender: random(["Male", "Female", "Other", "Prefer not to say"]),
        interestArea: random(areas),
        availability: random(["Weekdays", "Weekends", "Flexible"]),
        skills: [random(["Teaching", "Design", "Leadership", "Writing", "Public Speaking", "Social Media"]), random(["Excel", "Communication", "Canva", "Event Planning"] )],
        motivation: "I want to contribute to education, social change and community development through NayePankh Foundation.",
        status: random(statuses),
        registeredBy: random(users)._id,
        createdAt: new Date(2026, i % 6, (i % 25) + 1)
      };
    });

    await Volunteer.insertMany(volunteers);
    console.log("Seed completed ✅");
    console.log("Admin login: admin@nayepankh.org / admin123");
    console.log("Volunteer login: volunteer1@demo.com / password123");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeed();
