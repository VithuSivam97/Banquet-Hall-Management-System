import React from 'react';
import { Bell, Edit, Trash2, Eye, Check, X, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import AddPackageModal from '../components/AddPackageModal';

const VendorDashboard = () => {
    // Custom Accent Color
    const accentColor = '#f97316';

    const [isAddPackageModalOpen, setIsAddPackageModalOpen] = React.useState(false);
    const [editingPackage, setEditingPackage] = React.useState(null);

    // Mock Data
    const tasks = [
        { id: 1, event: 'Wedding Reception', client: 'Alice Johnson', service: 'Catering', dueDate: '2025/11/15' },
        { id: 2, event: 'Corporate Gala', client: 'TechCorp Inc.', service: 'Decoration', dueDate: '2025/12/01' },
        { id: 3, event: 'Birthday Party', client: 'Mark Smith', service: 'Sound System', dueDate: '2025/10/30' },
    ];

    const [packages, setPackages] = React.useState([
        {
            id: 1,
            name: 'Elegant Wedding Décor Package',
            description: 'Full floral arrangements, lighting, and table settings for a magical evening.',
            price: '75,000',
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=800&q=80'
        },
        {
            id: 2,
            name: 'Corporate Buffet Special',
            description: 'Premium buffet spread with 5-course meal and beverage service.',
            price: '120,000',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80'
        }
    ]);

    const handleSavePackage = (packageData) => {
        if (packageData.id) {
            // Edit existing
            setPackages(packages.map(p => p.id === packageData.id ? packageData : p));
        } else {
            // Add new
            const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
            setPackages([...packages, { ...packageData, id: newId }]);
        }
        setIsAddPackageModalOpen(false);
        setEditingPackage(null);
    };

    const handleDeletePackage = (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            setPackages(packages.filter(p => p.id !== id));
        }
    };

    const handleEditClick = (pkg) => {
        setEditingPackage(pkg);
        setIsAddPackageModalOpen(true);
    };

    const handleAddNewClick = () => {
        setEditingPackage(null);
        setIsAddPackageModalOpen(true);
    };

    const pendingPayments = [
        { id: 1, client: 'Alice Johnson / Wedding', amount: '50,000', dueDate: '2025/11/01' },
        { id: 2, client: 'TechCorp / Gala', amount: '100,000', dueDate: '2025/11/20' },
    ];

    const paymentHistory = [
        { id: 1, client: 'Mark Smith / Birthday', amount: '30,000', date: '2025/09/15' },
        { id: 2, client: 'John Doe / Anniversary', amount: '45,000', date: '2025/08/10' },
    ];

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-800">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

                {/* 2. Assigned Event Tasks */}
                <section className="eventTasksSection">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Assigned Event Tasks</h2>
                        <p className="text-gray-500 mt-1">Review and respond to your assigned tasks.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="vendorTaskTable w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Event Name</th>
                                        <th className="px-6 py-4 font-semibold">Client Name</th>
                                        <th className="px-6 py-4 font-semibold">Service Type</th>
                                        <th className="px-6 py-4 font-semibold">Due Date</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {tasks.map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{task.event}</td>
                                            <td className="px-6 py-4 text-gray-600">{task.client}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    {task.service}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{task.dueDate}</td>
                                            <td className="px-6 py-4 text-right space-x-3">
                                                <button
                                                    style={{ backgroundColor: accentColor }}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white hover:opacity-90 shadow-sm transition-opacity"
                                                >
                                                    <Check size={14} className="mr-1.5" />
                                                    Accept
                                                </button>
                                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
                                                    <X size={14} className="mr-1.5" />
                                                    Decline
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 3. My Packages Management */}
                <section className="packageManagementSection">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">My Packages</h2>
                        <button
                            onClick={handleAddNewClick}
                            style={{ backgroundColor: accentColor }}
                            className="addPackageButton inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white hover:opacity-90 shadow-sm transition-opacity"
                        >
                            <Plus size={18} className="mr-2" />
                            Add New Package
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="servicePackageCard bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditClick(pkg)}
                                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-blue-600 shadow-sm"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePackage(pkg.id)}
                                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-600 shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex-grow">{pkg.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <span className="text-lg font-bold" style={{ color: accentColor }}>Rs. {pkg.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Payments and Invoices */}
                <section className="paymentTrackingSection">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Pending Payments */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900">Pending Payments</h3>
                            </div>
                            <table className="w-full text-left flex-grow">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Client / Event</th>
                                        <th className="px-6 py-3 font-medium">Amount (Rs.)</th>
                                        <th className="px-6 py-3 font-medium">Due Date</th>
                                        <th className="px-6 py-3 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {pendingPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.client}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{payment.amount}</td>
                                            <td className="px-6 py-4 text-sm text-red-500 font-medium">{payment.dueDate}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Payment History */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900">Payment History</h3>
                            </div>
                            <table className="w-full text-left flex-grow">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Client / Event</th>
                                        <th className="px-6 py-3 font-medium">Amount (Rs.)</th>
                                        <th className="px-6 py-3 font-medium">Date Paid</th>
                                        <th className="px-6 py-3 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paymentHistory.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.client}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{payment.amount}</td>
                                            <td className="px-6 py-4 text-sm text-green-600 font-medium">{payment.date}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center">
                                <button style={{ color: accentColor }} className="text-sm font-medium hover:underline">
                                    View All History
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            <AddPackageModal
                isOpen={isAddPackageModalOpen}
                onClose={() => {
                    setIsAddPackageModalOpen(false);
                    setEditingPackage(null);
                }}
                onSave={handleSavePackage}
                initialData={editingPackage}
            />
        </div>
    );
};

export default VendorDashboard;
