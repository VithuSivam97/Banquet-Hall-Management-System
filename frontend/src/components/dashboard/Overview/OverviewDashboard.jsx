import React from 'react';
import StatCard from './StatCard';
import {
    Calendar,
    ClipboardList,
    Users,
    ShoppingBag,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import Card from '../../ui/Card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const OverviewDashboard = () => {
    // Mock data for charts
    const bookingData = [
        { name: 'Jan', bookings: 12 },
        { name: 'Feb', bookings: 19 },
        { name: 'Mar', bookings: 15 },
        { name: 'Apr', bookings: 25 },
        { name: 'May', bookings: 30 },
        { name: 'Jun', bookings: 22 },
    ];

    const recentBookings = [
        { id: 'B001', client: 'Jathuppiriyan', event: 'Wedding', date: '2025-04-15', status: 'Confirmed' },
        { id: 'B002', client: 'Kanistan', event: 'Corporate', date: '2025-04-18', status: 'Pending' },
        { id: 'B003', client: 'Sathu', event: 'Birthday', date: '2025-04-20', status: 'Confirmed' },
        { id: 'B004', client: 'Jeenuya', event: 'Conference', date: '2025-04-25', status: 'Pending' },
    ];

    const upcomingEvents = [
        { id: 1, event: 'Kunalan Wedding', date: '2025-04-15', location: 'Hall 1' },
        { id: 2, event: 'Tech Conference', date: '2025-04-18', location: 'Hall 2' },
        { id: 3, event: 'Sathu Birthday', date: '2025-04-20', location: 'Hall 3' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Bookings"
                    value="124"
                    icon={Calendar}
                    color="blue"
                />
                <StatCard
                    title="Upcoming Events"
                    value="18"
                    icon={ClipboardList}
                    color="green"
                />
                <StatCard
                    title="Active Staff"
                    value="32"
                    icon={Users}
                    color="purple"
                />
                <StatCard
                    title="Vendor Partners"
                    value="47"
                    icon={ShoppingBag}
                    color="orange"
                />
            </div>

            {/* Charts and Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Trends Chart */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Booking Trends</h3>
                        <span className="text-sm text-gray-500">Last 6 months</span>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bookingData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    cursor={{ fill: '#f3f4f6' }}
                                />
                                <Bar dataKey="bookings" fill="#f97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Bookings Table */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
                        <button className="text-[#f97316] text-sm hover:underline">View all</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="px-4 py-3 text-sm text-gray-900">{booking.client}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            <div>{booking.event}</div>
                                            <div className="text-xs">{booking.date}</div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                        <button className="text-[#f97316] text-sm hover:underline">View all</button>
                    </div>
                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-[#ffedd5] flex items-center justify-center text-[#f97316]">
                                    <ClipboardList size={20} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{event.event}</p>
                                    <p className="text-xs text-gray-500">{event.date} • {event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Alerts</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div className="ml-3">
                                <h4 className="text-sm font-medium text-red-800">Low Inventory</h4>
                                <p className="mt-1 text-sm text-red-700">Chair Covers and Table Runners are below threshold.</p>
                                <div className="mt-2">
                                    <button className="text-sm font-medium text-red-800 hover:text-red-900">View Inventory →</button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg flex items-start">
                            <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                            <div className="ml-3">
                                <h4 className="text-sm font-medium text-green-800">Revenue Up</h4>
                                <p className="mt-1 text-sm text-green-700">Revenue has increased by 15% compared to last month.</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OverviewDashboard;
