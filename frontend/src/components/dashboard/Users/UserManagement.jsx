import React from 'react'
import {
    Search,
    UserCheck,
    UserX,
    MoreHorizontal,
    Mail,
    Phone,
    Calendar,
} from 'lucide-react'
const UserManagement = () => {
    // Mock data for users
    const users = [
        {
            id: 'U001',
            name: 'Kunalan',
            email: 'kunaa2002@gmail.com',
            phone: '+94 77 111 2222',
            registeredDate: '2025-03-15',
            lastLogin: '2025-09-02',
            status: 'active',
            bookings: 3,
            totalSpent: 'Rs. 95,000',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            id: 'U002',
            name: 'Piraveena',
            email: 'piya0322@gmail.com',
            phone: '+94 76 222 3333',
            registeredDate: '2025-04-22',
            lastLogin: '2025-09-01',
            status: 'active',
            bookings: 2,
            totalSpent: 'Rs. 68,000',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
            id: 'U003',
            name: 'Sathushan',
            email: 'sathushan@gmail.com',
            phone: '+94 71 333 4444',
            registeredDate: '2025-03-10',
            lastLogin: '2025-08-25',
            status: 'inactive',
            bookings: 1,
            totalSpent: 'Rs. 32,000',
            image: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
        {
            id: 'U004',
            name: 'Anujan',
            email: 'anukumar1216@gmail.com',
            phone: '+94 77 444 5555',
            registeredDate: '2025-05-05',
            lastLogin: '2025-09-03',
            status: 'active',
            bookings: 4,
            totalSpent: 'Rs. 124,000',
            image: 'https://randomuser.me/api/portraits/men/65.jpg',
        },
        {
            id: 'U005',
            name: 'Jeenuya',
            email: 'jeenujothy44@gmail.com',
            phone: '+94 76 555 6666',
            registeredDate: '2025-03-18',
            lastLogin: '2025-08-15',
            status: 'suspended',
            bookings: 2,
            totalSpent: 'Rs. 58,000',
            image: 'https://randomuser.me/api/portraits/women/67.jpg',
        },
        {
            id: 'U006',
            name: 'Sancika',
            email: 'sancikasathes14@gmail.com',
            phone: '+94 71 666 7777',
            registeredDate: '2025-04-01',
            lastLogin: '2025-09-02',
            status: 'active',
            bookings: 1,
            totalSpent: 'Rs. 42,000',
            image: 'https://randomuser.me/api/portraits/women/33.jpg',
        },
        {
            id: 'U007',
            name: 'Abijan',
            email: 'abijan@example.com',
            phone: '+94 77 777 8888',
            registeredDate: '2025-03-30',
            lastLogin: '2025-08-28',
            status: 'active',
            bookings: 2,
            totalSpent: 'Rs. 75,000',
            image: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
            id: 'U008',
            name: 'Jathupriyan',
            email: 'jathu@example.com',
            phone: '+94 76 888 9111',
            registeredDate: '2025-04-12',
            lastLogin: '2025-07-30',
            status: 'inactive',
            bookings: 1,
            totalSpent: 'Rs. 38,000',
            image: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
    ];
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <div className="mt-3 sm:mt-0 flex space-x-2">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                        Export Users
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                        + Add User
                    </button>
                </div>
            </div>
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center border rounded-md bg-gray-50 px-3 py-2">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="ml-2 flex-1 outline-none bg-transparent text-sm min-w-[200px]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <select className="border rounded-md bg-white px-3 py-2 text-sm outline-none">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                        </select>
                        <select className="border rounded-md bg-white px-3 py-2 text-sm outline-none">
                            <option value="">Sort By</option>
                            <option value="name">Name</option>
                            <option value="date">Registration Date</option>
                            <option value="bookings">Number of Bookings</option>
                            <option value="spent">Total Spent</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    User
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Contact
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Registration
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Activity
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={user.image}
                                                    alt={user.name}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: #{user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 flex items-center">
                                            <Mail size={14} className="mr-1" /> {user.email}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <Phone size={14} className="mr-1" /> {user.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 flex items-center">
                                            <Calendar size={14} className="mr-1" />{' '}
                                            {user.registeredDate}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Last login: {user.lastLogin}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {user.status.charAt(0).toUpperCase() +
                                                user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {user.bookings} bookings
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Total: {user.totalSpent}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                className="p-1 text-blue-600 hover:text-blue-900"
                                                title="View Details"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                            {user.status !== 'suspended' ? (
                                                <button
                                                    className="p-1 text-red-600 hover:text-red-900"
                                                    title="Suspend User"
                                                >
                                                    <UserX size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    className="p-1 text-green-600 hover:text-green-900"
                                                    title="Activate User"
                                                >
                                                    <UserCheck size={18} />
                                                </button>
                                            )}
                                            <button
                                                className="p-1 text-gray-600 hover:text-gray-900"
                                                title="More Options"
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{' '}
                            <span className="font-medium">{users.length}</span> of{' '}
                            <span className="font-medium">{users.length}</span> users
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
                                disabled
                            >
                                Previous
                            </button>
                            <button
                                className="px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
                                disabled
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserManagement
