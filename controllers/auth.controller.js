import authModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "../utils/generateVeficationToken.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All Fields are required.");
    }
    const userAlreadyExists = await authModel.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new authModel({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verfificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized Access." });
    }

    const token = generateToken(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
        token,
      },
    });
  } catch (error) {}
};

export const checkAuth = async (req, res) => {
  try {
    const user = await authModel.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
