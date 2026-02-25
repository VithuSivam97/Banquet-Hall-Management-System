import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const AddPackageModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');

    const fileInputRef = useRef(null);
    const accentColor = '#f97316';

    useEffect(() => {
        if (isOpen && initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setAmount(initialData.price || ''); // Note: VendorDashboard uses 'price', Modal uses 'amount'
            setImagePreview(initialData.image || null);
            setImage(null); // Reset file input
        } else if (isOpen && !initialData) {
            // Reset for new entry
            setName('');
            setDescription('');
            setAmount('');
            setImage(null);
            setImagePreview(null);
        }
        setError('');
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // Validation
        if (!name.trim()) {
            setError('Package name is required.');
            return;
        }
        if (!amount || isNaN(amount.toString().replace(/,/g, ''))) {
            setError('Please enter a valid amount.');
            return;
        }
        if (!imagePreview && !image) {
            setError('Please select an image for the package.');
            return;
        }

        setError('');

        // Mock save - pass data back to parent
        onSave({
            ...(initialData || {}), // Preserve ID if editing
            name,
            description,
            price: amount, // Normalize to 'price' to match dashboard data
            image: imagePreview
        });

        onClose();
    };

    return (
        <div className="addPackageModalOverlay fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{initialData ? 'Edit Package' : 'Add New Package'}</h2>
                        <p className="text-sm text-gray-500 mt-1">{initialData ? 'Update the details of your package.' : 'Fill in the details to create a new service or package.'}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 p-2 rounded-full hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="addPackageForm space-y-6">

                    {/* Package Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="packageNameInput w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all"
                            style={{ '--tw-ring-color': accentColor }}
                            placeholder="Elegant Wedding Décor Package"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all resize-none"
                            style={{ '--tw-ring-color': accentColor }}
                            placeholder="Brief description of the package"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Package Amount (Rs.)</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all"
                            style={{ '--tw-ring-color': accentColor }}
                            placeholder="Rs. 75,000"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${imagePreview ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:bg-gray-50'}`}
                            style={imagePreview ? {} : { borderColor: error && !image ? 'red' : '' }}
                        >
                            {imagePreview ? (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <p className="text-white font-medium">Click to change</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-gray-400">
                                        <ImageIcon size={24} />
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (Max 5MB)</p>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="packageFormActions flex grid grid-cols-2 gap-4 pt-2">
                        <button
                            onClick={onClose}
                            className="w-full py-3 px-4 bg-white border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            style={{ backgroundColor: accentColor }}
                            className="savePackageButton w-full py-3 px-4 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
                        >
                            {initialData ? 'Update Package' : 'Save Package'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPackageModal;
