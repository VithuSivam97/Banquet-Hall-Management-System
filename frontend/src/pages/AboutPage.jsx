import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import VisionCard from '../components/VisionCard';

const AboutPage = ({ onNavigateToLogin, onNavigateToRegister }) => {
    return (
        <div className="w-full min-h-screen bg-white">
            <Navbar onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} />

            {/* Hero Section */}
            <div className="heroSection">
                <div className="pageContainer text-center">
                    <h1 className="heroMainHeading mb-6">
                        About <span className="text-orange-500">Our System</span>
                    </h1>
                    <p className="heroDescription max-w-3xl mx-auto">
                        A sophisticated digital platform designed to simplify event booking,
                        vendor coordination, and hall management for memorable celebrations.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="pageContainer pb-16">
                {/* About Section */}
                <div className="aboutContentWrapper mb-24">
                    <div className="flex flex-col justify-center">
                        <SectionHeading>Our Story</SectionHeading>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            The Banquet Hall Management System was developed with a singular
                            focus: to transform the way event venues operate. We understand
                            the complexities involved in managing event spaces, coordinating
                            with vendors, and ensuring client satisfaction.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our platform streamlines these processes through intuitive
                            interfaces, automated workflows, and comprehensive management
                            tools. Whether you're booking a wedding reception, corporate
                            event, or celebration, our system ensures a seamless experience
                            from initial inquiry to the day of the event.
                        </p>
                    </div>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                            alt="Elegant banquet hall setup"
                            className="rounded-xl shadow-lg w-full h-auto object-cover hover:shadow-2xl transition-shadow duration-300"
                        />
                    </div>
                </div>

                {/* Vision, Mission, Goals Section */}
                <div className="mb-24">
                    <SectionHeading>Our Foundation</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <VisionCard
                            title="Our Vision"
                            description="To make event planning effortless and transparent, creating memorable experiences without the stress."
                            icon="vision"
                        />
                        <VisionCard
                            title="Our Mission"
                            description="To provide venue managers and clients with powerful tools that simplify communication, streamline operations, and enhance event quality."
                            icon="mission"
                        />
                        <VisionCard
                            title="Our Goals"
                            description="To continuously innovate our platform, ensuring it remains the most comprehensive and user-friendly banquet hall management solution available."
                            icon="goals"
                        />
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="mb-16">
                    <SectionHeading>Celebrations We Support</SectionHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                        <img
                            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                            alt="Wedding reception"
                            className="rounded-xl h-64 w-full object-cover shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                            alt="Corporate event"
                            className="rounded-xl h-64 w-full object-cover shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1470753323753-3f8091bb0232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                            alt="Birthday celebration"
                            className="rounded-xl h-64 w-full object-cover shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
