import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, companyName, phone } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // First user becomes admin, others become regular users
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    const user = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      companyName,
      phone
    });

    const userObj = user.toObject();

    const userResponse = {
      _id: userObj._id.toString(),
      username: userObj.username,
      email: userObj.email,
      role: userObj.role,
      companyName: userObj.companyName,
      phone: userObj.phone
    };

    // Login after registration
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { 
        id: userObj._id.toString(), 
        username: userObj.username, 
        role: userObj.role
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res.status(201).json({ 
      message: "User registered successfully", 
      token,
      user: userResponse 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ 
      message: "Server error"
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      await bcrypt.compare(password, "$2b$10$dummyhashdummyhashdummyhashdummy");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userObj = user.toObject();

    const token = jwt.sign(
      { 
        id: userObj._id.toString(), 
        username: userObj.username, 
        role: userObj.role
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    const userResponse = {
      _id: userObj._id.toString(),
      username: userObj.username,
      email: userObj.email,
      role: userObj.role,
      companyName: userObj.companyName,
      phone: userObj.phone
    };

    res.json({ 
      message: "Login successful", 
      token,
      user: userResponse 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      message: "Server error"
    });
  }
};