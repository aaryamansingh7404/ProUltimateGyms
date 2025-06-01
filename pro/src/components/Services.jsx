import "../styles/services.css"; 
import { useState } from "react";
import bannerImage from "../assets/homepro.png"; 
import proImage from "../assets/homepro2.png"; 
import proWeightTraining from "../assets/weighttraining.png"; 
import proCardio from "../assets/cardio.jpg"; 
import proYoga from "../assets/yoga.jpg"; 
import proZumba from "../assets/zumba.jpg"; 
import proDance from "../assets/dance.png";
import Probdprep from "../assets/bdprep3.png";
import Proplprep from "../assets/plprep.jpg";
import Pronp from "../assets/np.jpg";


const ServiceCard = ({ image, title, shortText, fullText }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="service-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>
        {showFull ? fullText : shortText}
        <span
          className="toggle-btn"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? " See Less" : " See More"}
        </span>
      </p>
    </div>
  );
};

const Services = () => {
  return (
    <div className="services-section">
      <h2>Our <span className="highlight">Services</span></h2>
      <div className="services-grid">

        <ServiceCard
          image={proWeightTraining}
          title="Weight Training"
          shortText="Build muscle and strength with personalized coaching."
          fullText="Weight training is designed to help you build muscle, gain strength, and sculpt your physique using barbells, dumbbells, cables, and machines. Whether you're a beginner or advanced, we offer customized splits like push-pull-legs, upper-lower, and full-body, guided with proper form and progressive overload."
        />

        <ServiceCard
          image={proCardio}
          title="Cardio"
          shortText="Boost stamina and burn fat with energy-filled sessions."
          fullText="Cardio sessions improve heart health, stamina, and fat loss through HIIT, LISS, and functional circuits. Ideal for all levels, you’ll use treadmills, battle ropes, and more to elevate your endurance and metabolic rate."
        />

        <ServiceCard
          image={proZumba}
          title="Zumba"
          shortText="Dance-based cardio for fun and fitness."
          fullText="Zumba combines fun dance moves with aerobic steps set to energetic music. It’s a great way to stay fit, burn calories, and improve coordination, all while enjoying yourself in a stress-free environment."
        />

        <ServiceCard
          image={proYoga}
          title="Yoga"
          shortText="Flexibility, strength, and peace of mind."
          fullText="Our yoga classes focus on physical alignment, mental clarity, and flexibility through Hatha, Vinyasa, and restorative flows. Ideal for stress relief, injury recovery, and inner peace."
        />

        <ServiceCard
          image={proDance}
          title="Dance"
          shortText="Express yourself while staying fit."
          fullText="Dance classes include Hip-Hop, Bollywood, and Freestyle routines that boost agility, rhythm, and confidence. It’s a fun way to burn calories while learning expressive movement."
        />

        <ServiceCard
          image={Probdprep}
          title="Bodybuilding Prep"
          shortText="Competition-ready physique transformation."
          fullText="Our bodybuilding prep includes muscle-building phases, cutting, peak week protocols, and posing practice. Whether for natural or enhanced categories, we guide you through strategic training, nutrition, and stage confidence."
        />

        <ServiceCard
          image={Proplprep}
          title="Powerlifting Prep"
          shortText="Boost your squat, bench & deadlift."
          fullText="Powerlifting prep focuses on strength-building cycles for the big three lifts. Get expert guidance on form, periodization, recovery, and meet-day strategies to break your personal bests or dominate on stage."
        />

        <ServiceCard
          image={Pronp}
          title="Nutrition Plans"
          shortText="Tailored diet plans for your goals."
          fullText="Our custom nutrition plans help you gain muscle, lose fat, or enhance performance with personalized macronutrient breakdowns, meal timing, and food preferences. Easy to follow, sustainable, and results-driven."
        />

      </div>
    </div>
  );
};

export default Services;