import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Users,
    IndianRupee,
    MapPin,
    Wifi,
    Utensils,
    Car,
    Music,
    CheckCircle,
    Star,
    Calendar,
    Check
} from 'lucide-react';

import { isAuthenticated } from '../utils/tokenStorage';

const HallDetailPage = ({ onNavigateToLogin, onNavigateToRegister }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(location.state?.selectedDate || '');
    const dateInputRef = useRef(null);

    // Get today's date in local time for min attribute
    const getTodayString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleContainerClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    const handleBookNow = () => {
        if (!isAuthenticated()) {
            alert("Please login to the system first.");
            return;
        }

        if (!selectedDate) {
            alert("Please select a date first.");
            return;
        }
        navigate('/packages');
    };

    const facilities = [
        { name: "Free WiFi", icon: Wifi },
        { name: "Catering Service", icon: Utensils },
        { name: "Parking", icon: Car },
        { name: "Bridal Suite", icon: Users }, // Using Users as proxy for suite/room
        { name: "Sound System", icon: Music },
        { name: "Decorations", icon: Star },
    ];

    return (
        <div className="w-full min-h-screen bg-white">
            <Navbar onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} />

            {/* Full Width Hero Section */}
            <div className="hallImageSection relative w-full h-[500px] mt-16">
                <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Hall 1"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <div className="pageContainer">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                            Available
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            Hall 1
                        </h1>
                        <p className="text-white/90 text-lg flex items-center">
                            <MapPin size={20} className="mr-2" />
                            Main Building, Ground Floor
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pageContainer py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2">

                        {/* About Section */}
                        <div className="mb-12">
                            <h2 className="sectionTitle mb-6 !text-left">About this venue</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Experience elegance and luxury in our flagship Hall 1. perfectly designed for grand weddings,
                                corporate galas, and large-scale celebrations. With its crystal chandeliers,
                                spacious layout, and state-of-the-art lighting, this venue provides a magical
                                ambiance for your special day. The hall features high ceilings and pillar-less
                                architecture ensures an unobstructed view for all your guests.
                            </p>
                        </div>

                        {/* Facilities Grid */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Facilities</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {facilities.map((item, idx) => (
                                    <div key={idx} className="flex items-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                                        <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                                            <Check size={16} className="text-orange-500" />
                                        </div>
                                        <span className="font-medium text-gray-700">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                    {/* Right Column: Sticky Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bookingCard bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Details</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                        <div className="flex items-center text-gray-600">
                                            <Users size={20} className="text-orange-500 mr-3" />
                                            <span>Capacity</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">Up to 500 guests</span>
                                    </div>

                                    <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                        <div className="flex items-center text-gray-600">
                                            <IndianRupee size={20} className="text-orange-500 mr-3" />
                                            <span>Price</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">From Rs. 120,000</span>
                                    </div>

                                    <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                        <div className="flex items-center text-gray-600">
                                            <CheckCircle size={20} className="text-green-500 mr-3" />
                                            <span>Availability</span>
                                        </div>
                                        <span className="font-semibold text-green-600">Available</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Check Availability
                                    </label>

                                    {/* Custom Date Input Implementation */}
                                    <div
                                        className="relative cursor-pointer bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-500 transition-colors"
                                        onClick={handleContainerClick}
                                    >
                                        <input
                                            ref={dateInputRef}
                                            type="date"
                                            min={getTodayString()}
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 z-0 pointer-events-none"
                                        />
                                        <div className="w-full px-4 py-3 flex items-center justify-between">
                                            <span className={`text-base ${selectedDate ? 'text-gray-900' : 'text-gray-400'}`}>
                                                {selectedDate ? selectedDate.replace(/-/g, '/') : 'YYYY/MM/DD'}
                                            </span>
                                            <Calendar size={20} className="text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBookNow}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                                >
                                    Book Now
                                </button>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HallDetailPage;
