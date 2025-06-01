import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/AccountStatement.css";

const trainerFees = {
  "Amit Verma": 7000,
  "Rohit Sharma": 12000,
  "Neha Singh": 5000,
  "Simran Kaur": 9000,
  // yahan apne jitne trainers hain unka naam aur fees add kar sakte ho
};
const AccountStatement = ({ userEmail }) => {
  const [membershipData, setMembershipData] = useState(null);

  useEffect(() => {
    if (!userEmail) {
      setMembershipData(null);
      return;
    }

    setMembershipData(null); // clear old data on email change

    fetch(`http://localhost:5001/api/membership-details?email=${userEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch membership details");
        return res.json();
      })
      .then((data) => setMembershipData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [userEmail]);

  // if (!membershipData) return <div>Loading...</div>;
  if (!userEmail) {
    return (
      <div className="error-message">
        ❌ Email not provided. Please login or enter your email.
      </div>
    );
  }

  if (membershipData === null) {
    return (
      <div className="loading-message">
        ⏳ Fetching your membership details...
      </div>
    );
  }

  if (!membershipData || !membershipData._id) {
    return (
      <div className="error-message">
        ⚠️ No membership data found for this email.
      </div>
    );
  }

  // Calculate fees based on backend data and trainer fees mapping
  const totalAmount = membershipData.totalPrice || 0;
  const trainerFee = membershipData.trainerRequired
    ? trainerFees[membershipData.selectedTrainer] || 0
    : 0;
  const membershipFee = totalAmount - trainerFee;

  const generatePDF = () => {
    const doc = new jsPDF();

    // ✅ Watermark
    doc.setFontSize(50);
    doc.setTextColor(220);
    // doc.text("Pro Ultimate Gym", 35, 150, { angle: 45, opacity: 0.1 });

    // ✅ Logo Text
    doc.setFontSize(26);
    doc.setTextColor(255, 0, 0); // Red
    doc.text("Pro", 85, 25);

    doc.setTextColor(0, 0, 0); // Black
    doc.text("Ultimate Gym", 100, 25); // Space 

    // ✅ Section Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("Payment Slip", 120, 40, { align: "center" });
    

    // ✅ User Info
    doc.setFontSize(12);
    let y = 55;
    doc.text(`Name: ${membershipData.fullName}`, 20, y);
    doc.text(`Email: ${membershipData.email}`, 20, y + 8);
    doc.text(`Phone: ${membershipData.phone}`, 20, y + 16);
    doc.text(`Gym location: ${membershipData.location}`, 20, y + 24);
    // doc.text(`Street: ${membershipData.street || "-"}`, 20, y + 32);
    // doc.text(`City: ${membershipData.city || "-"}`, 20, y + 40);
    // doc.text(`State: ${membershipData.state || "-"}`, 20, y + 48);

    // ✅ Table
    autoTable(doc, {
      startY: y + 40,
      head: [["Description", "Amount (₹)"]],
      body: [
        ["Membership Fee", membershipFee],
        ["Trainer Fee", trainerFee],
        ["Total Amount", totalAmount],
      ],
      theme: "grid",
      styles: {
        halign: "center",
        cellPadding: 6,
      },
      headStyles: {
        fillColor: [255, 0, 0], // Red header
        textColor: [255, 255, 255],
      },
    });

    // ✅ Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for choosing Pro Ultimate Gym!", 20, 170);
    doc.save(`PaymentSlip_${membershipData._id}.pdf`);
  };

  return (
    <div className="account-statement">
      <h2>Your Payment Details</h2>
      <p>
        <strong>Name:</strong> {membershipData.fullName}
      </p>
      <p>
        <strong>Email:</strong> {membershipData.email}
      </p>
      <p>
        <strong>Phone:</strong> {membershipData.phone}
      </p>
      <p>
        <strong>Gym location:</strong> {membershipData.location}
      </p>
      {/* <p>
        <strong>Street:</strong> {membershipData.street || "-"}
      </p>
      <p>
        <strong>City:</strong> {membershipData.city || "-"}
      </p>
      <p>
        <strong>State:</strong> {membershipData.state || "-"}
      </p> */}
      <p>
        <strong>Membership Fee:</strong> ₹{membershipFee}
      </p>
      <p>
        <strong>Trainer Fee:</strong> ₹{trainerFee}
      </p>
      <p>
        <strong>Total Amount:</strong> ₹{totalAmount}
      </p>

      <button onClick={generatePDF}>Download Payment Slip</button>
    </div>
  );
};

export default AccountStatement;
