import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, IndianRupee, Calendar } from 'lucide-react';
import hall2Image from '../assets/hall2.jpg';
import hall3Image from '../assets/hall3.jpg';

const HallsPage = ({ onNavigateToLogin, onNavigateToRegister }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const dateInputRef = React.useRef(null);
    const navigate = useNavigate();

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

    const hallsList = [
        {
            id: 1,
            hallName: "Hall 1",
            maxGuestCapacity: "500 Guests",
            pricePerEvent: "120,000",
            status: "Available",
            hallImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 2,
            hallName: "Hall 2",
            maxGuestCapacity: "600 Guests",
            pricePerEvent: "120,000",
            status: "Booked",
            hallImage: hall2Image,
        },
        {
            id: 3,
            hallName: "Hall 3",
            maxGuestCapacity: "500 Guests",
            pricePerEvent: "120,000",
            status: "Available",
            hallImage: hall3Image,
        }
    ];

    return (
        <div className="w-full min-h-screen bg-white">
            <Navbar onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} />
            <div className="pt-20">
                <section className="banquetHallsSection">
                    <div className="pageContainer">

                        {/* Section Header */}
                        <div className="sectionHeader mb-8">
                            <h2 className="sectionTitle">
                                Our Banquet Halls
                            </h2>
                            <p className="sectionDescription">
                                Choose from our premium selection of elegant venues for your special celebration
                            </p>
                        </div>

                        {/* Date Selection */}
                        <div className="mb-12 flex justify-center">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-md w-full relative">
                                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                                    Select Date
                                </label>
                                <div
                                    className="relative cursor-pointer"
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
                                    <div className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-orange-500 transition-colors">
                                        <span>
                                            {selectedDate ? selectedDate.replace(/-/g, '/') : <span className="text-gray-400">YYYY/MM/DD</span>}
                                        </span>
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Halls Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {hallsList.map((hall) => (
                                <div key={hall.id} className="hallCard cardRadius subtleShadow bg-white overflow-hidden flex flex-col h-full rounded-xl hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                    {/* Hall Image Section */}
                                    <div className="hallImageContainer relative h-56">
                                        {/* Status Badge - Only shown when date is selected */}
                                        {selectedDate && (
                                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm z-10 ${hall.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                                                }`}>
                                                {hall.status}
                                            </div>
                                        )}
                                        <img
                                            src={hall.hallImage}
                                            alt={hall.hallName}
                                            className="hallImage w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>

                                    {/* Hall Information */}
                                    <div className="hallInfoSection p-6 flex-grow flex flex-col">
                                        {/* Hall Name */}
                                        <h3 className="hallCardTitle text-xl font-bold text-gray-800 mb-4">
                                            {hall.hallName}
                                        </h3>

                                        {/* Hall Details */}
                                        <div className="space-y-3 mb-6 flex-grow">
                                            <div className="flex items-center text-gray-600">
                                                <Users size={18} className="text-orange-500 mr-2" />
                                                <span className="text-sm font-medium">{hall.maxGuestCapacity}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <IndianRupee size={18} className="text-orange-500 mr-2" />
                                                <span className="text-sm font-medium">From {hall.pricePerEvent}</span>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <button
                                            onClick={() => navigate(`/hall/${hall.id}`, { state: { selectedDate } })}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 mt-auto"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default HallsPage;
