import UserModel from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

class UserController {
  static createUserDoc = async (req, res) => {
    console.log("📩 Received Data:", req.body); // Debugging

    // ✅ Include state and city
    const { firstName, lastName, email, password, confirmPassword, address, phone, state, city } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !state || !city) {
      console.log("❌ Missing Required Fields"); // Debugging
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phone,
        state,
        city,
      });

      const savedUser = await newUser.save();
      console.log("✅ User Saved:", savedUser);
      res.status(201).json({ message: "Signup successful", user: savedUser });
    } catch (error) {
      console.error("🔴 Server Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  static verifyLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login Attempt:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id,  email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  };
}

export default UserController;
