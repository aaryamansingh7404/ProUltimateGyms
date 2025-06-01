import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  state: String,
  city: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
