import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// import Loader from './components/Loader'; 
// import MainApp from './main';
import React, { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from './components/ErrorBoundary'; 

// 🔁 Lazy load all route-based components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
import UserDashboard from './components/userDashboard.jsx';
import Membership from './components/Membership.jsx';
import AccountStatement from './components/AccountStatement.jsx';


const App = () => {
  
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email); // email extract
      } catch (error) {
        console.error('Invalid token');
        setUserEmail(null);
      }
    }
  }, []);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // simulate loading for 2 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    
    <Router>
       {/* {isLoading ? <Loader /> : <MainApp />} */}
      <Navbar />
      
      <ErrorBoundary>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/account" element={<AccountStatement userEmail={userEmail}/>} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
};

export default App;
