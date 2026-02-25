import React, { useState } from 'react';
import {
    User, Award, Check, X, Search, Plus, Minus,
    FileText, Trash2, Bell, LogOut
} from 'lucide-react';

import Navbar from '../components/Navbar';

const StaffDashboard = ({ onNavigateToLogin, onNavigateToRegister }) => {
    // Custom Accent Color
    const accentColor = '#f97316';

    // Mock Data for Tasks
    const [tasks, setTasks] = useState([
        { id: 1, event: 'Wedding', date: '2025/10/25', task: 'Set up hall decorations and arrange tables', status: 'Pending' },
        { id: 2, event: 'Birthday Party', date: '2025/10/24', task: 'Prepare audio-visual equipment and check microphones', status: 'Pending' },
    ]);

    // Mock Data for Inventory
    const [inventory, setInventory] = useState([
        { id: 1, item: 'Wine Glasses', quantity: 150, reason: '' },
        { id: 2, item: 'Tablecloths - White', quantity: 50, reason: '' },
        { id: 3, item: 'Chair Covers', quantity: 200, reason: '' },
        { id: 4, item: 'Champagne Flutes', quantity: 100, reason: '' },
    ]);

    // Mock Data for Notifications
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New task assigned: Wedding Setup', time: '10 mins ago' },
        { id: 2, message: 'Salary invoice ready for September', time: '1 hour ago' },
        { id: 3, message: 'Inventory update reminder', time: '1 day ago' },
    ]);

    // Handlers
    const handleQuantityChange = (id, change) => {
        setInventory(inventory.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        ));
    };

    const handleReasonChange = (id, value) => {
        setInventory(inventory.map(item =>
            item.id === id ? { ...item, reason: value } : item
        ));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Navbar (Top Bar like Home Page) */}
            <Navbar onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} showMyInfo={true} />

            {/* 1. Dashboard Header */}
            <header className="staffDashboardHeader bg-[#ffedd5] shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Tharsan!</h1>
                        <p className="text-[#f97316] font-medium mt-1">Ready for another productive day?</p>
                    </div>

                    <div className="flex items-center space-x-8">
                        {/* Stats Badge */}
                        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-[#f97316]/20">
                            <Award className="text-[#f97316] mr-2" size={20} />
                            <span className="text-gray-600 font-medium mr-2">Completed Tasks</span>
                            <span className="bg-[#f97316] text-white text-xs font-bold px-2 py-0.5 rounded-full">124</span>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3 border-l pl-8 border-[#f97316]/20">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm text-[#f97316]">
                                <User size={24} />
                            </div>
                            {/* <button className="text-gray-500 hover:text-[#f97316] transition-colors">
                                <LogOut size={20} />
                            </button> */}
                            {/* Removed redundant Logout button since it's in Navbar now */}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column - 8 Cols */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 2. Task Management Section */}
                        <section className="taskManagementSection bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Current Assignments</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Event</th>
                                            <th className="px-6 py-4 font-semibold">Date</th>
                                            <th className="px-6 py-4 font-semibold">Task</th>
                                            <th className="px-6 py-4 font-semibold text-center">Actions</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-sm">
                                        {tasks.map((task) => (
                                            <tr key={task.id} className="hover:bg-gray-50/50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{task.event}</td>
                                                <td className="px-6 py-4 text-gray-500">{task.date}</td>
                                                <td className="px-6 py-4 text-gray-600 max-w-xs">{task.task}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center space-x-2">
                                                        <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors">
                                                            <Check size={18} />
                                                        </button>
                                                        <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        className="taskStatusDropdown bg-white border border-gray-200 text-gray-700 text-xs rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#f97316]/20"
                                                        defaultValue={task.status}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* 3. Inventory Tracking Section */}
                        <section className="inventoryManagementSection bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <h2 className="text-xl font-bold text-gray-900">Inventory Tracking</h2>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search inventory..."
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316]"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Item Name</th>
                                            <th className="px-6 py-4 font-semibold text-center">Quantity</th>
                                            <th className="px-6 py-4 font-semibold">Reason</th>
                                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-sm">
                                        {inventory.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.item}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center space-x-3">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, -1)}
                                                            className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, 1)}
                                                            className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter the reason..."
                                                        value={item.reason}
                                                        onChange={(e) => handleReasonChange(item.id, e.target.value)}
                                                        className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs focus:outline-none focus:border-[#f97316]"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        className="inventoryUpdateBtn px-4 py-1.5 rounded-lg text-white text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
                                                        style={{ backgroundColor: accentColor }}
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                    </div>

                    {/* Right Column - 4 Cols Sidebar */}
                    <div className="dashboardSidebar lg:col-span-4 space-y-8">

                        {/* Salary Card */}
                        <div className="salaryTrackingCard bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900">Salary & Payslips</h3>
                            </div>
                            <div className="p-4">
                                <table className="w-full text-sm">
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="group">
                                            <td className="py-3 px-2 text-gray-900 font-medium">Sept 2025</td>
                                            <td className="py-3 px-2 text-gray-500">2025/09/30</td>
                                            <td className="py-3 px-2 text-right">
                                                <button className="salaryDownloadLink text-gray-400 hover:text-[#f97316] transition-colors">
                                                    <FileText size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="group">
                                            <td className="py-3 px-2 text-gray-900 font-medium">Aug 2025</td>
                                            <td className="py-3 px-2 text-gray-500">2025/08/31</td>
                                            <td className="py-3 px-2 text-right">
                                                <button className="salaryDownloadLink text-gray-400 hover:text-[#f97316] transition-colors">
                                                    <FileText size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Notifications Card */}
                        <div className="staffNotificationsCard bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                <div className="relative">
                                    <Bell size={18} className="text-gray-400" />
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start justify-between group">
                                        <div>
                                            <p className="text-sm text-gray-800 font-medium leading-snug">{notif.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteNotification(notif.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {notifications.length === 0 && (
                                    <div className="p-6 text-center text-sm text-gray-500">
                                        No new notifications
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
};

export default StaffDashboard;
