import React, { useState } from 'react';
import '../styles/membership.css';

const trainers = [
  {
    name: 'Rohit Sharma',
    email: 'rohit@proultimategyms.com',
    phone: '9876543210',
    expertIn: 'Weight Training',
    price: '12000/Month',
  },
  {
    name: 'Neha Singh',
    email: 'neha@proultimategyms.com',
    phone: '9123456789',
    expertIn: 'Yoga & Flexibility',
    price: '5000/Month',
  },
  {
    name: 'Amit Verma',
    email: 'amit@proultimategyms.com',
    phone: '9988776655',
    expertIn: 'Cardio & Endurance',
    price: '7000/Month',
  },
  {
    name: 'Simran Kaur',
    email: 'simran@proultimategyms.com',
    phone: '9012345678',
    expertIn: 'Nutrition & Diet',
    price: '9000/Month',
  },
];

const membershipPrices = {
  '3 Months': 6000,
  '6 Months': 10000,
  '9 Months': 15000,
  '12 Months': 20000,
};

export default function GymMembershipForm() {
  const [trainerRequired, setTrainerRequired] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    location: '',
    membershipPlan: '',
    startDate: '',
    selectedTrainer: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone Number must be 10 digits';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    if (!formData.street.trim()) newErrors.street = 'Street / House No. is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'Zip / Postal Code is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.membershipPlan) newErrors.membershipPlan = 'Membership Plan is required';
    if (!formData.startDate) newErrors.startDate = 'Start Date of Membership is required';
    if (trainerRequired && !formData.selectedTrainer) {
      newErrors.selectedTrainer = 'Please select a trainer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getTrainerPrice = (trainerName) => {
    const trainer = trainers.find(t => t.name === trainerName);
    if (!trainer) return 0;
    return parseInt(trainer.price.split('/')[0]) || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const membershipCost = membershipPrices[formData.membershipPlan] || 0;
      const trainerCost = trainerRequired ? getTrainerPrice(formData.selectedTrainer) : 0;
      const totalCost = membershipCost + trainerCost;

      const dataToSend = {
        ...formData,
        trainerRequired,
        totalPrice: totalCost,
      };

      try {
        const response = await fetch('http://localhost:5001/api/membership', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          alert('Membership registered successfully!');
          setFormData({
            fullName: '',
            dob: '',
            gender: '',
            phone: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            location: '',
            membershipPlan: '',
            startDate: '',
            selectedTrainer: '',
          });
          setTrainerRequired(false);
          setErrors({});
        } else {
          alert('Failed to register membership.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting membership.');
      }
    }
  };

  const membershipCost = membershipPrices[formData.membershipPlan] || 0;
  const trainerCost = trainerRequired ? getTrainerPrice(formData.selectedTrainer) : 0;
  const totalPrice = membershipCost + trainerCost;

  return (
    <div className="form-container">
      <h2 className="form-title">
        <span className="gym">Gym</span>
        <span className="membership">Membership</span>
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        {errors.fullName && <div className="error">{errors.fullName}</div>}

        {/* Date of Birth */}
        <label htmlFor="dob">Date of Birth (DOB) *</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.dob && <div className="error">{errors.dob}</div>}

        {/* Gender */}
        <label>Gender *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            /> Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={handleChange}
            /> Other
          </label>
        </div>
        {errors.gender && <div className="error">{errors.gender}</div>}

        {/* Phone Number */}
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          placeholder="10 digit phone number"
        />
        {errors.phone && <div className="error">{errors.phone}</div>}

        {/* Email Address */}
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="example@mail.com"
        />
        {errors.email && <div className="error">{errors.email}</div>}

        {/* Address Fields */}
        <label htmlFor="street">Street / House No. *</label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        {errors.street && <div className="error">{errors.street}</div>}

        <label htmlFor="city">City *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors.city && <div className="error">{errors.city}</div>}

        <label htmlFor="state">State *</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        {errors.state && <div className="error">{errors.state}</div>}

        <label htmlFor="zip">Zip / Postal Code *</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          required
        />
        {errors.zip && <div className="error">{errors.zip}</div>}

        {/* Location dropdown */}
        <label htmlFor="location">Gym Location *</label>

        <select
      id="location"
      name="location"
      value={formData.location}
      onChange={handleChange}
      required
    >
     <option value="">-- Select Location --</option>
<option value="Ambala City">Ambala City</option>
<option value="Ambala Cantt">Ambala Cantt</option>
<option value="Mohali">Mohali</option>
<option value="Kharar">Kharar</option>
<option value="Delhi">Delhi</option>
<option value="Rajasthan">Rajasthan</option>
<option value="Gujrat">Gujrat</option>
<option value="Lucknow">Lucknow</option>
<option value="Patna">Patna</option>
<option value="Noida">Noida</option>
<option value="Pune">Pune</option>
<option value="Mumbai">Mumbai</option>
<option value="Kolkata">Kolkata</option>

    </select>
    {errors.location && <div className="error">{errors.location}</div>}

    {/* Membership Plan dropdown */}
    <label htmlFor="membershipPlan">Membership Plan *</label>
    <select
      id="membershipPlan"
      name="membershipPlan"
      value={formData.membershipPlan}
      onChange={handleChange}
      required
    >
      <option value="">-- Select Plan --</option>
      <option value="3 Months">3 Months - ₹6,000</option>
      <option value="6 Months">6 Months - ₹10,000</option>
      <option value="9 Months">9 Months - ₹15,000</option>
      <option value="12 Months">12 Months - ₹20,000</option>
    </select>
    {errors.membershipPlan && <div className="error">{errors.membershipPlan}</div>}

    {/* Start Date */}
    <label htmlFor="startDate">Start Date of Membership *</label>
    <input
      type="date"
      id="startDate"
      name="startDate"
      value={formData.startDate}
      onChange={handleChange}
      required
      min={new Date().toISOString().split("T")[0]}
    />
    {errors.startDate && <div className="error">{errors.startDate}</div>}

   

     {/* Trainer Required? */}
     <label>Trainer Required?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="trainerRequired"
              value="yes"
              checked={trainerRequired === true}
              onChange={() => {
                setTrainerRequired(true);
                setFormData(prev => ({ ...prev, selectedTrainer: '' })); // Reset selected trainer
              }}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="trainerRequired"
              value="no"
              checked={trainerRequired === false}
              onChange={() => {
                setTrainerRequired(false);
                setFormData(prev => ({ ...prev, selectedTrainer: '' })); // Reset selected trainer
              }}
            /> No
          </label>
        </div>
        {/* Trainer Info + Select option */}
{trainerRequired && (
  <div className="trainer-section">
    <h3 style={{ color: 'red', marginBottom: '1rem' }}>Available Trainers (Select One)</h3>
    <div className="trainers-list">
      {trainers.map((t, i) => (
        <div
          key={i}
          className={`trainer-card ${formData.selectedTrainer === t.name ? 'selected' : ''}`}
          onClick={() => setFormData(prev => ({ ...prev, selectedTrainer: t.name }))}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setFormData(prev => ({ ...prev, selectedTrainer: t.name }));
            }
          }}
        >
          {/* Tick icon */}
          {formData.selectedTrainer === t.name && (
            <div className="tick-mark">&#10003;</div>  // ✓ tick mark
          )}
          <div className="trainer-info">
            <div className="trainer-name"><b>{t.name}</b></div>
            <div>Email: {t.email}</div>
            <div>Phone: {t.phone}</div>
            <div className="trainer-expert"><i>Expert in: {t.expertIn}</i></div>
            <div className="trainer-price">Price: {t.price}</div>
          </div>
        </div>
      ))}
    </div>
    {errors.selectedTrainer && <div className="error">{errors.selectedTrainer}</div>}
  </div>
)}
      
        {/* Display total price dynamically */}
  <div className="total-price">
  <h3>Membership: ₹{membershipCost} +  Trainer fees: ₹{trainerCost}</h3>
  <h3> Total Payable: ₹{totalPrice} </h3>
  {/* <small>(Membership: ₹{membershipCost} + Trainer fees: ₹{trainerCost})</small> */}
</div>

    <button type="submit" className="submit-btn">Submit Membership</button>
  </form>
</div>

  
  );
}
