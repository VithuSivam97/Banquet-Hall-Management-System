import React from 'react';
import { X } from 'lucide-react';

const AddStaffModal = ({ isOpen, onClose, onSave }) => {
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        category: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!isOpen) return null;

    const handleSave = async () => {
        // Validation check (basic)
        if (!formData.email || !formData.name || !formData.category) {
            alert("Please fill in all required fields (Name, Category, Email).");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/staff/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    role: 'Staff',
                    category: formData.category,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Staff member added successfully!\n\nA password reset link has been sent to ${formData.email}.`);
                onSave(); // Close modal and trigger parent refresh
                setFormData({ name: '', category: '', email: '', phone: '', address: '' }); // Reset form
            } else {
                alert(data.message || 'Failed to add staff member.');
            }
        } catch (error) {
            console.error('Error adding staff:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modalOverlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="modalHeaderContainer bg-[#f97316] px-6 py-4 flex items-center justify-between">
                    <h2 className="text-white text-lg font-bold">Add New Staff Member</h2>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <div className="staffForm p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., John Doe"
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Staff Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        >
                            <option value="" disabled>Choose category...</option>
                            <option value="Event Manager">Event Manager</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Catering">Catering</option>
                            <option value="Decoration">Decoration</option>
                            <option value="Cleaning">Cleaning</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g., john@example.com"
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="e.g., +94 77 123 4567"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="2"
                            disabled={loading}
                            placeholder="Enter full address..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent resize-none disabled:bg-gray-100 disabled:text-gray-500"
                        ></textarea>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="formActionGroup px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="cancelBtn px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="assignBtn px-6 py-2 bg-[#f97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Assign'
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddStaffModal;
