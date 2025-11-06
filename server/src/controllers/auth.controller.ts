import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || "user",
    });

    // Create response object without password - FIXED VERSION
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.status(201).json({ 
      message: "User registered successfully", 
      user: userResponse 
    });
  } catch (err) {
    console.error("Registration error:", err);
    const isProduction = process.env.NODE_ENV === "production";
    res.status(500).json({ 
      message: "Server error", 
      error: isProduction ? undefined : err 
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Validate JWT secret
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const genericError = "Invalid credentials";
    
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Use bcrypt.compare with dummy data to prevent timing attacks
      await bcrypt.compare(password, "$2b$10$dummyhashdummyhashdummyhashdummy");
      return res.status(400).json({ message: genericError });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: genericError });
    }

    const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username, 
        role: user.role 
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    // Create user response without password
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.json({ 
      message: "Login successful", 
      token,
      user: userResponse 
    });
  } catch (err) {
    console.error("Login error:", err);
    const isProduction = process.env.NODE_ENV === "production";
    res.status(500).json({ 
      message: "Server error", 
      error: isProduction ? undefined : err 
    });
  }
};