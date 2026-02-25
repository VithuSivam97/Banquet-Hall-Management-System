import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    MapPin,
    Users,
    Calendar,
    Clock,
    MoreHorizontal,
    Eye,
    Edit2,
    CheckCircle,
    XCircle,
    Download
} from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';

const BookingsManagement = () => {
    const [filterStatus, setFilterStatus] = useState('all');

    // Enhanced mock data
    const bookings = [
        {
            id: 'B001',
            client: 'Jathupriyan',
            eventType: 'Wedding',
            date: '2025-04-15',
            time: '16:00 - 22:00',
            location: 'Hall 1',
            guests: 150,
            status: 'confirmed',
            totalAmount: 'Rs. 125,000',
            paidAmount: 'Rs. 62,500',
        },
        {
            id: 'B002',
            client: 'Anujan',
            eventType: 'Corporate',
            date: '2025-05-18',
            time: '09:00 - 17:00',
            location: 'Hall 2',
            guests: 200,
            status: 'pending',
            totalAmount: 'Rs. 80,000',
            paidAmount: 'Rs. 40,000',
        },
        {
            id: 'B003',
            client: 'Sancika',
            eventType: 'Birthday',
            date: '2025-06-20',
            time: '18:00 - 23:00',
            location: 'Hall 3',
            guests: 50,
            status: 'confirmed',
            totalAmount: 'Rs. 35,000',
            paidAmount: 'Rs. 35,000',
        },
        {
            id: 'B004',
            client: 'Piraveena',
            eventType: 'Launch',
            date: '2025-05-25',
            time: '14:00 - 20:00',
            location: 'Hall 1',
            guests: 300,
            status: 'pending',
            totalAmount: 'Rs. 150,000',
            paidAmount: 'Rs. 75,000',
        },
    ];

    const filteredBookings = filterStatus === 'all'
        ? bookings
        : bookings.filter(b => b.status === filterStatus);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
                    <p className="text-sm text-gray-500">Manage and track all event reservations.</p>
                </div>
                <Button>
                    <Plus size={18} className="mr-2" />
                    New Booking
                </Button>
            </div>

            <Card className="p-4">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search bookings..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] appearance-none bg-white cursor-pointer"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" size="md">
                            <Download size={18} />
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{booking.client}</div>
                                        <div className="text-xs text-gray-500">ID: {booking.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{booking.eventType}</div>
                                        <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                            <MapPin size={12} className="mr-1" /> {booking.location}
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                            <Users size={12} className="mr-1" /> {booking.guests} guests
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 flex items-center">
                                            <Calendar size={14} className="mr-1.5" /> {booking.date}
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center mt-1">
                                            <Clock size={14} className="mr-1.5" /> {booking.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full capitalize
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{booking.totalAmount}</div>
                                        <div className="text-xs text-gray-500">{booking.paidAmount} paid</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button className="text-gray-400 hover:text-indigo-600 transition-colors" title="View Details">
                                                <Eye size={18} />
                                            </button>
                                            <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                                                <Edit2 size={18} />
                                            </button>
                                            {booking.status === 'pending' && (
                                                <button className="text-gray-400 hover:text-green-600 transition-colors" title="Approve">
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Mockup */}
                <div className="flex items-center justify-between mt-4 px-2">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBookings.length}</span> of <span className="font-medium">{filteredBookings.length}</span> results
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BookingsManagement;
