import React, { useState } from 'react';
import {
    Search,
    Filter,
    CheckCircle,
    XCircle,
    Star,
    ExternalLink
} from 'lucide-react';
import Button from '../../ui/Button';

const VendorManagement = () => {
    const [activeTab, setActiveTab] = useState('all');

    const vendors = [
        {
            id: 1,
            name: 'Kuna Wedding Catering',
            category: 'Catering',
            contact: 'Kunalan',
            email: 'kunaa2002@gmail.com',
            phone: '+94 77 987 6543',
            rating: 4.8,
            status: 'approved',
            pendingApproval: false,
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
            id: 2,
            name: 'Sathu Decor Solutions',
            category: 'Decoration',
            contact: 'Sathushan',
            email: 'sathushan@gmail.com',
            phone: '+94 76 876 5432',
            rating: 4.5,
            status: 'approved',
            pendingApproval: false,
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
            id: 5,
            name: 'Jathupriyan Photography',
            category: 'Photography',
            contact: 'Jathupriyan',
            email: 'jathu@example.com',
            phone: '+94 71 765 4321',
            rating: 4.6,
            status: 'pending',
            pendingApproval: true,
            image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
            id: 6,
            name: 'Piraveena Sweet Delights',
            category: 'Cakes & Desserts',
            contact: 'Piraveena',
            email: 'piya0322@gmail.com',
            phone: '+94 77 654 3210',
            rating: 4.7,
            status: 'pending',
            pendingApproval: true,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
    ];

    const filteredVendors = activeTab === 'all'
        ? vendors
        : activeTab === 'pending'
            ? vendors.filter(v => v.pendingApproval)
            : vendors.filter(v => !v.pendingApproval);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
                <Button>+ Add Vendor</Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex px-4">
                        {['all', 'pending', 'approved'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors capitalize flex items-center
                  ${activeTab === tab
                                        ? 'border-[#f97316] text-[#f97316]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                {tab === 'all' ? 'All Vendors' : tab === 'pending' ? 'Pending Approval' : 'Approved Vendors'}
                                {tab === 'pending' && vendors.filter(v => v.pendingApproval).length > 0 && (
                                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">
                                        {vendors.filter(v => v.pendingApproval).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Filters */}
                <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search vendors..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316]">
                            <option>All Categories</option>
                            <option>Catering</option>
                            <option>Photography</option>
                        </select>

                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                    <div key={vendor.id} className={`bg-white rounded-lg shadow-sm overflow-hidden border-t-4 
             ${vendor.pendingApproval ? 'border-t-yellow-400' : 'border-t-green-500'}`}>

                        <div className="h-40 bg-gray-100 relative">
                            <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold shadow-sm
                            ${vendor.pendingApproval ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    {vendor.pendingApproval ? 'Pending' : 'Approved'}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1" title={vendor.name}>{vendor.name}</h2>
                                    <p className="text-sm text-[#f97316] font-medium">{vendor.category}</p>
                                </div>
                                <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                                    <span className="text-sm font-semibold">{vendor.rating}</span>
                                </div>
                            </div>

                            <div className="space-y-2 mt-4 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-900">Contact:</span> {vendor.contact}</p>
                                <p><span className="font-medium text-gray-900">Email:</span> {vendor.email}</p>
                                <p><span className="font-medium text-gray-900">Phone:</span> {vendor.phone}</p>
                            </div>

                            {vendor.pendingApproval && (
                                <div className="mt-6 flex gap-2">
                                    <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                                        <CheckCircle size={16} className="mr-1.5" /> Approve
                                    </button>
                                    <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center">
                                        <XCircle size={16} className="mr-1.5" /> Reject
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between">
                            <button className="text-sm font-medium text-[#f97316] hover:text-[#ea580c] flex items-center">
                                View Details <ExternalLink size={14} className="ml-1" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorManagement;
