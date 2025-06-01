import React, { useEffect, useState } from "react";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [membershipData, setMembershipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);
        if (!token) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5001/api/user-dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const data = await res.json();
          console.log("Error data from backend:", data);
          setError(data.error || "Failed to fetch");
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Fetched data:", data);
        setUserData(data.user);
        setMembershipData(data.membership);
        setFormData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          address: data.user.address,
          state: data.user.state,
          city: data.user.city,
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setMembershipData(null);
    window.location.href = "/";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Update failed");
        return;
      }

      const data = await res.json();
      alert("Profile updated successfully");
      setUserData(data.user);
      setEditing(false);
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <div className="profile-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
  
        <div className="section-title-row">
          <h2 className="section-title">Profile Details</h2>
          {!editing && (
            <svg
              className="edit-icon"
              viewBox="0 0 24 24"
              onClick={() => setEditing(true)}
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          )}
        </div>
  
        {editing ? (
          <>
            {["firstName", "lastName", "email", "phone", "address", "city", "state"].map((field) => (
              <div className="info-row" key={field}>
                <div className="label">{field.replace(/^\w/, (c) => c.toUpperCase())}:</div>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button onClick={handleSubmit}>Save Changes</button>
          </>
        ) : (
          <>
            <div className="info-row"><div className="label">Name:</div><div className="value">{userData.firstName} {userData.lastName}</div></div>
            <div className="info-row"><div className="label">Email:</div><div className="value">{userData.email}</div></div>
            <div className="info-row"><div className="label">Phone:</div><div className="value">{userData.phone}</div></div>
            <div className="info-row"><div className="label">Address:</div><div className="value">{userData.address}, {userData.city}, {userData.state}</div></div>
          </>
        )}
  
        {membershipData && (
          <>
            <div className="info-row"><div className="label">Plan:</div><div className="value">{membershipData.membershipPlan}</div></div>
            <div className="info-row"><div className="label">Start Date:</div><div className="value">{membershipData.startDate}</div></div>
            <div className="info-row"><div className="label">Trainer Required:</div><div className="value">{membershipData.trainerRequired ? "Yes" : "No"}</div></div>
            {membershipData.trainerRequired && (
              <div className="info-row"><div className="label">Selected Trainer:</div><div className="value">{membershipData.selectedTrainer}</div></div>
            )}
            <div className="info-row"><div className="label">Total Price:</div><div className="value">₹{membershipData.totalPrice}</div></div>
          </>
        )}
      </div>
  
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  )};
  
export default UserDashboard;
