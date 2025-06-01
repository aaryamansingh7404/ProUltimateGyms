import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { EffectFade, Autoplay } from "swiper/modules";
import "../styles/home.css";
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



const Home = () => {
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState(null); 

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (!isAuthenticated) {
  //     alert("Please login first!");
  //     navigate("/login", { replace: true });
  //   }
  // }, [navigate]);

  return (
    <div className="home-container">
      {/* Background Swiper */}
      <div className="swiper-wrapper">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="swiper-container"
          onSwiper={(swiper) => setSwiperInstance(swiper)}
        >
          <SwiperSlide>
            <img src={bannerImage} alt="Pro Ultimate Gym Banner" className="banner-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={proImage} alt="Pro Ultimate Gym Slide 2" className="banner-img" />
          </SwiperSlide>
        </Swiper>

        {/* Navigation Buttons */}
        <button className="prev-btn" onClick={() => swiperInstance?.slidePrev()}>❮</button>
        <button className="next-btn" onClick={() => swiperInstance?.slideNext()}>❯</button>
      </div>

     {/* ✅ Welcome Section - Swiper ke Niche ✅ */}
      <div className="welcome-section">
        <div className="welcome-image">
          <img 
            src="https://content3.jdmagicbox.com/comp/yamunanagar/d9/9999p1732.1732.230224113143.p9d9/catalogue/pro-ultimate-gyms-yamuna-nagar-yamunanagar-women-gyms-swng5p48au.jpg" 
            alt="Gym Reception" 
            className="reception-img" 
          />
        </div>
        <div className="welcome-text">
        <h2 classname="wlcm">Welcome To</h2>
        <h2><span className="highlight">Pro Ultimate Gyms</span></h2>
          <p>
            Pro Ultimate Gyms is a rapidly growing gym franchise that is dedicated to
            helping individuals achieve their fitness goals. With 45+ branches across
            the country, Pro Ultimate Gyms provides state-of-the-art equipment,
            knowledgeable trainers, and a supportive community to help members get fit and stay healthy.
          </p>
               <button className="ct-btn" onClick={() => navigate('/about')}>Learn More</button>

        </div>
      </div>

       
      <div className="gym-services-container">
  <h2>Our <span className="gym-highlight-text">Services</span></h2>
  <div className="gym-services-grid">

    <div className="gym-service-card">
      <img src={proWeightTraining} alt="Weight Training" />
      <h3>Weight Training</h3>
      <p>Get 1-on-1 coaching with expert trainers.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

    <div className="gym-service-card">
      <img src={proCardio} alt="Cardio" />
      <h3>Cardio</h3>
      <p>High-energy workouts for all fitness levels.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

    <div className="gym-service-card">
      <img src={proYoga} alt="Zumba" />
      <h3>Zumba</h3>
      <p>Fun and energetic dance workouts.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

    <div className="gym-service-card">
      <img src={proZumba} alt="Yoga" />
      <h3>Yoga</h3>
      <p>Improve flexibility and mental well-being.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

    <div className="gym-service-card">
      <img src={proDance} alt="Dance" />
      <h3>Dance</h3>
      <p>Express yourself and stay fit through dance.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

    <div className="gym-service-card">
      <img src={Probdprep} alt="BodyBuilding Prep" />
      <h3>BodyBuilding Prep</h3>
      <p>Comprehensive training and better conditioning for competitions.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

    <div className="gym-service-card">
      <img src={Proplprep} alt="PowerLifting Prep" />
      <h3>PowerLifting Prep</h3>
      <p>Specialized strength training for competitions.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

    <div className="gym-service-card">
      <img src={Pronp} alt="Nutrition Plans" />
      <h3>Nutrition Plans</h3>
      <p>Custom diets for muscle gain, fat loss, or performance.</p>
      <button className="gym-learn-btn" onClick={() => navigate('/services')}>Learn More</button>
    </div>

  </div>
</div>


    </div>
  );
};

export default Home;
