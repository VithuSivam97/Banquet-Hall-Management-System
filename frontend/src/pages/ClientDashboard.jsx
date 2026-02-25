import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Calendar, Package, LogOut, User } from 'lucide-react';
import { removeToken } from '../utils/tokenStorage';

const ClientDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/';
                    return;
                }

                // Fetch User Info (simulated or from /api/auth/profile)
                // For now, let's assume we have a profile endpoint or get it from login data
                const user = JSON.parse(localStorage.getItem('user'));
                setUserData(user);

                // Fetch Bookings
                const response = await axios.get('http://127.0.0.1:5000/api/bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        removeToken();
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading Dashboard...</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-stone-800 text-white p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-stone-800 font-bold">R</div>
                    <span className="text-xl font-bold">Raajeshwary</span>
                </div>

                <nav className="space-y-4">
                    <a href="#" className="flex items-center gap-3 p-3 bg-stone-700 rounded-lg text-orange-200">
                        <LayoutDashboard size={20} /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 text-stone-400 hover:text-white transition">
                        <Calendar size={20} /> My Bookings
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 text-stone-400 hover:text-white transition">
                        <Package size={20} /> Services
                    </a>
                    <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-400 hover:text-red-300 transition w-full mt-20">
                        <LogOut size={20} /> Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-stone-800">Welcome to Client Dashboard, {userData?.name || 'Client'}!</h1>
                    <div className="flex items-center gap-2">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-stone-600">{userData?.name}</p>
                            <p className="text-xs text-stone-400">{userData?.role}</p>
                        </div>
                        <div className="w-10 h-10 bg-stone-300 rounded-full flex items-center justify-center text-stone-600">
                            <User size={20} />
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                        <h3 className="text-stone-500 text-sm font-medium mb-2">Total Bookings</h3>
                        <p className="text-3xl font-bold text-stone-800">{bookings.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                        <h3 className="text-stone-500 text-sm font-medium mb-2">Active Events</h3>
                        <p className="text-3xl font-bold text-stone-800">
                            {bookings.filter(b => b.bookingStatus === 'Confirmed').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                        <h3 className="text-stone-500 text-sm font-medium mb-2">Membership</h3>
                        <p className="text-3xl font-bold text-stone-800">{userData?.role}</p>
                    </div>
                </div>

                {/* Recent Bookings Table */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                    <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-stone-800">Recent Bookings</h2>
                        <button className="text-orange-500 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-stone-50">
                                <tr>
                                    <th className="p-4 text-stone-500 text-sm font-semibold">Booking ID</th>
                                    <th className="p-4 text-stone-500 text-sm font-semibold">Event Date</th>
                                    <th className="p-4 text-stone-500 text-sm font-semibold">Hall</th>
                                    <th className="p-4 text-stone-500 text-sm font-semibold">Amount</th>
                                    <th className="p-4 text-stone-500 text-sm font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {bookings.length > 0 ? bookings.map((booking) => (
                                    <tr key={booking.bookingID} className="hover:bg-stone-50 transition">
                                        <td className="p-4 font-medium text-stone-700">{booking.bookingID}</td>
                                        <td className="p-4 text-stone-600">{new Date(booking.eventDate).toLocaleDateString()}</td>
                                        <td className="p-4 text-stone-600">{booking.hallID}</td>
                                        <td className="p-4 text-stone-600">{parseFloat(booking.totalAmount).toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.bookingStatus === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.bookingStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {booking.bookingStatus}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-stone-400">No bookings found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
