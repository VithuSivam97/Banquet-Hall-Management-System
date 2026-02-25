import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, ChevronDown, CheckCircle } from 'lucide-react';

const Package = ({ onNavigateToLogin, onNavigateToRegister }) => {
    const [activeFilter, setActiveFilter] = useState('All Packages');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Package Data
    const packages = [
        {
            id: 1,
            title: "Wedding",
            category: "Wedding",
            price: "150,000",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0202128?w=800&q=80",
            features: ["Luxury decoration", "Catering", "Photography"],
            isCustom: false
        },
        {
            id: 2,
            title: "Custom Large Event",
            category: "Custom",
            price: "200,000",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
            features: ["Fully customizable theme", "Multiple catering options", "Vendor coordination"],
            isCustom: true,
            badge: "Vendor Managed"
        }
    ];

    // Simple filter logic (for demonstration, though "All Packages" shows all)
    // The requirements say "When a dropdown item is selected, it should act like a filter and update the active state."
    // It doesn't explicitly say to HIDE items, but usually filters hide items. 
    // Requirement: "Card 1: Wedding", "Card 2: Custom Large Event" - implies these specific cards should be present.
    // I will show all cards for "All Packages", and filter for others if they match.
    // "Wedding" matches Card 1. "Custom" matches Card 2. "Birthday"/"Corporate" might match nothing or placeholders.
    // Given the explicit card descriptions, I will just render the two cards, but maybe respect the filter visibility if it matches categories.

    const filteredPackages = activeFilter === 'All Packages'
        ? packages
        : packages.filter(pkg =>
            pkg.category === activeFilter ||
            (activeFilter === 'Custom' && pkg.category === 'Custom')
        );

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col">
            <Navbar onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} />

            <main className="packagePageContainer flex-grow pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">

                {/* Header and Navigation */}
                <div className="packageHeader flex flex-col items-center mb-12">
                    <h1 className="pageTitle text-4xl font-bold text-gray-900 mb-8 text-center">
                        Event Packages
                    </h1>

                    {/* Filter Bar */}
                    <div className="filterBar flex items-center bg-white p-1 rounded-full shadow-sm border border-gray-200">
                        <button
                            onClick={() => handleFilterClick('All Packages')}
                            className={`filterButton px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === 'All Packages'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            All Packages
                        </button>

                        <button
                            onClick={() => handleFilterClick('Custom')}
                            className={`filterButton px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === 'Custom'
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Custom
                        </button>

                        {/* Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className={`filterDropdownButton flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${['Wedding', 'Birthday', 'Corporate'].includes(activeFilter)
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                More
                                <ChevronDown size={16} className="ml-2" />
                            </button>

                            {isDropdownOpen && (
                                <div className="dropdownMenu absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 overflow-hidden">
                                    {['Wedding', 'Birthday', 'Corporate'].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => handleFilterClick(item)}
                                            className="dropdownItem w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Package Cards Grid */}
                <div className="packageGrid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Mapped cards based on filter, or just the static ones if filter logic isn't strictly required to hide them. 
              The prompt implies "Display packages", and describes 2 specific cards. 
              If I filter "Birthday" (which has no card described), it would show empty. 
              I'll implement the filter logic to be functional. Card 1 is Wedding, Card 2 is Custom.
          */}
                    {filteredPackages.map((pkg) => (
                        <div key={pkg.id} className="packageCard bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-gray-100">

                            {/* Card Image */}
                            <div className="cardImageContainer relative h-64 w-full overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="cardImage w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />

                                {pkg.badge && (
                                    <div className="badgeOverlay absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        {pkg.badge}
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="cardContent p-8 flex flex-col flex-grow">
                                <h3 className="cardTitle text-2xl font-bold text-gray-900 mb-6">
                                    {pkg.title}
                                </h3>

                                {/* Features List */}
                                <ul className="featuresList space-y-4 mb-8 flex-grow">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="featureItem flex items-start text-gray-600">
                                            <div className="iconWrapper mt-0.5 mr-3 p-1 bg-indigo-50 rounded-full text-indigo-600">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Price and Button */}
                                <div className="cardFooter mt-auto pt-6 border-t border-gray-100">
                                    <div className="priceContainer mb-6">
                                        <span className="text-sm text-gray-500 font-medium">Starting from</span>
                                        <div className="priceValue text-3xl font-bold text-indigo-600">
                                            Rs. {pkg.price}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/payment')}
                                        className="bookButton w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95 flex items-center justify-center">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredPackages.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500 text-lg">No packages found for this category.</p>
                            <button
                                onClick={() => setActiveFilter('All Packages')}
                                className="mt-4 text-indigo-600 font-medium hover:underline"
                            >
                                View all packages
                            </button>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Package;
