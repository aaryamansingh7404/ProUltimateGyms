import express from "express";
import Membership from "../models/Membership.js";

const router = express.Router();

router.post("/membership", async (req, res) => {
  try {
    const newMember = new Membership(req.body);
    await newMember.save();
    res.status(201).json({ message: "Membership saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save membership." });
  }
});

// GET route - Fetch membership by email
router.get("/membership-details", async (req, res) => {
  const email = req.query.email?.toLowerCase().trim();
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const membershipData = await Membership.findOne({ email });
    if (!membershipData) return res.status(404).json({ message: 'No membership found' });

    res.json(membershipData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
