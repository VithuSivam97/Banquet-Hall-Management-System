import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Halls from '../components/Halls';
import Feedback from '../components/Feedback';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = ({ onNavigateToLogin, onNavigateToRegister }) => {
  return (
    <>
      <Navbar
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToRegister={onNavigateToRegister}
        showMyInfo={true}
      />
      <Hero />
      <About />
      <Services />
      <Halls />
      <Feedback />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
