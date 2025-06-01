// src/components/About.jsx
import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Welcome to <span className='underline-pro'>Pro </span>Ultimate Gym</h1>
      <p className="about-tagline">Where Champions Are Built!</p>
      <p className="about-text">
        At <strong>Pro Ultimate Gym</strong>, we believe fitness is not just a goal, it's a lifestyle. 
        Whether you're preparing for your next bodybuilding competition or starting your fitness journey, 
        we've got everything you need under one roof.
      </p>
      <ul className="about-list">
        <li>🥗 Custom Diet & Nutrition Plans</li>
        <li>🏋️ Advanced Strength & Conditioning Programs</li>
        <li>💪 Competition Prep Coaching (Natural & Enhanced)</li>
        <li>🧠 Mental Wellness & Motivation Sessions</li>
        <li>🛡️ Safe Supplement Guidance</li>
      </ul>
      <p className="about-quote">"Train like a beast, shine like a pro."</p>
    </div>
  );
};

export default About;
