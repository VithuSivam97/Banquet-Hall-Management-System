import React from 'react';
import { Save, Upload, Landmark, Building, Mail, Phone, MapPin } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';

const Settings = () => {
    return (
        <div className="settingsContainer space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                <p className="text-sm text-gray-500">Manage your hall details and configuration.</p>
            </div>

            <div className="systemSettingsForm bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 max-w-4xl mx-auto">
                <form className="space-y-8">

                    {/* 2. Basic Information Fields */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <Building size={18} className="text-[#f97316]" />
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="inputFieldLabel block text-sm font-medium text-gray-700">System Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="Raajeshwary Hall"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="inputFieldLabel block text-sm font-medium text-gray-700">Phone Number</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        defaultValue="21 205 3999"
                                        className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="inputFieldLabel block text-sm font-medium text-gray-700">Contact Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="email"
                                        defaultValue="rajeshwaryjaffna@gmail.com"
                                        className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="inputFieldLabel block text-sm font-medium text-gray-700">Business Address</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <textarea
                                        defaultValue="132, Palali Road, Kondavil, Jaffna."
                                        rows={2}
                                        className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Branding & Identity Section */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <Upload size={18} className="text-[#f97316]" />
                            Branding & Identity
                        </h2>

                        <div className="space-y-6">
                            <div className="logoUploadSection flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                    <span className="text-xs">Logo Preview</span>
                                </div>
                                <div className="space-y-2 text-center sm:text-left">
                                    <Button type="button" variant="secondary" size="md">
                                        Upload Logo
                                    </Button>
                                    <p className="text-xs text-gray-500">Recommended size: 200 × 200 px, JPG or PNG.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-1">
                                    <label className="inputFieldLabel block text-sm font-medium text-gray-700">Vision</label>
                                    <input
                                        type="text"
                                        placeholder="Enter the vision here..."
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="inputFieldLabel block text-sm font-medium text-gray-700">Mission</label>
                                    <input
                                        type="text"
                                        placeholder="Enter the mission here..."
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Details Section */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <Landmark size={18} className="text-[#f97316]" />
                            Bank Account Details
                        </h2>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                                <div>
                                    <p className="text-blue-800 font-semibold mb-1">Bank Name</p>
                                    <p className="text-gray-700 bg-white p-2 rounded border border-blue-100">Sampath Bank</p>
                                </div>
                                <div>
                                    <p className="text-blue-800 font-semibold mb-1">Account Name</p>
                                    <p className="text-gray-700 bg-white p-2 rounded border border-blue-100">Raajeshwary Hall</p>
                                </div>
                                <div>
                                    <p className="text-blue-800 font-semibold mb-1">Account Number</p>
                                    <p className="text-gray-700 bg-white p-2 rounded border border-blue-100">1234 5678 9012</p>
                                </div>
                                <div>
                                    <p className="text-blue-800 font-semibold mb-1">Branch</p>
                                    <p className="text-gray-700 bg-white p-2 rounded border border-blue-100">Colombo 03</p>
                                </div>
                            </div>
                            <p className="text-xs text-blue-600 mt-4 italic">
                                * These details are displayed to customers for bank transfer payments.
                            </p>
                        </div>
                    </div>

                    {/* 4. Action Area */}
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="saveChangesBtn flex items-center px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200"
                        >
                            <Save size={18} className="mr-2" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
