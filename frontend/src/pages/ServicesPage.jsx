import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import {
    Calendar,
    Users,
    Utensils,
    Palette,
    ClipboardCheck,
    UserCheck,
    TrendingUp
} from 'lucide-react';

const ServicesPage = ({ onNavigateToLogin, onNavigateToRegister }) => {
    const services = [
        {
            icon: Calendar,
            title: 'Hall Booking',
            description: 'Streamlined reservation system for selecting and securing the perfect venue. Includes real-time availability, virtual tours, and instant confirmation.'
        },
        {
            icon: Users,
            title: 'Vendor Management',
            description: 'Comprehensive platform to connect with trusted vendors for your event needs. Easily compare options, review credentials, and manage all contracts in one place.'
        },
        {
            icon: Utensils,
            title: 'Catering',
            description: 'Extensive menu planning and food service coordination. From cuisine selection to dietary accommodations, ensure a delightful culinary experience for all guests.'
        },
        {
            icon: Palette,
            title: 'Decoration',
            description: 'Creative design solutions to transform venues into stunning event spaces. Browse themes, customize layouts, and visualize the final setup before your event.'
        },
        {
            icon: ClipboardCheck,
            title: 'Event Planning',
            description: 'End-to-end event coordination with customizable timelines and checklists. Keep track of all details and ensure nothing falls through the cracks.'
        },
        {
            icon: UserCheck,
            title: 'Staff Assignment',
            description: 'Efficient allocation of personnel based on event requirements. Ensure optimal staffing levels with the right expertise for each function of your event.'
        },
        {
            icon: TrendingUp,
            title: 'Real-Time Tracking',
            description: 'Live monitoring of event progress, budget expenditure, and task completion. Make informed decisions with up-to-the-minute status updates on all aspects of your event.'
        }
    ];

    return (
        <>
            <Navbar onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} />

            <div className="pt-20">
                <section className="servicesSection">
                    <div className="pageContainer">

                        {/* Header Section */}
                        <div className="sectionHeader">
                            <h2 className="sectionTitle !text-left">
                                Our Services
                            </h2>
                            <p className="sectionDescription">
                                Our Raajeshwary hall integrates all essential event services into one seamless platform.
                                From initial booking to final execution, we provide a comprehensive solution that ensures
                                every detail of your event is perfectly coordinated, saving you time and reducing stress
                                while delivering exceptional experiences.
                            </p>
                        </div>

                        {/* Services Grid */}
                        <div className="layoutResponsiveGrid3">
                            {services.map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                />
                            ))}
                        </div>

                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default ServicesPage;
