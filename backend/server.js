import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import userDashboardRouter from "./routes/user-dashboard.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB(process.env.MONGO_URL);

// Routes
app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", membershipRoutes);
app.use("/api", userDashboardRouter);
// app.use("/api", paymentRoutes);


// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
