import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage = ({ onNavigateToLogin, onNavigateToRegister }) => {
    return (
        <>
            <Navbar onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} />
            <div className="pt-20">
                <Contact />
            </div>
            <Footer />
        </>
    );
};

export default ContactPage;
