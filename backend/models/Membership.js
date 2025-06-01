import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  location: String,
  membershipPlan: String,
  startDate: String,
  trainerRequired: Boolean,
  selectedTrainer: String,
  totalPrice: Number
});

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;