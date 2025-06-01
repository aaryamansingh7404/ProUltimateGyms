import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Password & Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("🔵 Sending Form Data:", formData); // Debugging

    try {
      const res = await axios.post("http://localhost:5001/api/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("🟢 Signup Response:", res);
      console.log("🟢 Signup Response Data:", res.data);

      if (res.data.success) {
        alert("Signup Successful!");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("🔴 Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup Failed!");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signpro">Pro
      <span className="prohighlight"> Ultimate Gyms</span></h2>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;