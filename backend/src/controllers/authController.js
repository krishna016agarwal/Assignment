import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role: "volunteer" });
  res.status(201).json({ user: userResponse(user), token: generateToken(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({ user: userResponse(user), token: generateToken(user) });
};

export const me = async (req, res) => {
  res.json({ user: userResponse(req.user) });
};
