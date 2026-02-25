import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
import { CreditCard, Landmark, Lock, ArrowLeft, Calendar, Package, DollarSign, User, ChevronDown, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const HallPayment = ({ onNavigateToLogin, onNavigateToRegister }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentType, setPaymentType] = useState('Total Payment');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handlePaymentSubmit = () => {
        // Simulate API call
        setTimeout(() => {
            setShowSuccessModal(true);
        }, 500);
    };

    return (
        <div className="hallPaymentPageContainer w-full min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
            {showSuccessModal && (
                <PaymentSuccessModal
                    onClose={() => setShowSuccessModal(false)}
                    amount="Rs. 250,000"
                    date="2025/10/26"
                />
            )}
            <Navbar showMyInfo={true} onNavigateToLogin={onNavigateToLogin} onNavigateToRegister={onNavigateToRegister} />

            <div className="flex-grow pt-24 pb-12 px-4">
                <div className="max-w-2xl mx-auto space-y-8">

                    {/* 1. Page Header */}
                    <div className="paymentPageHeader text-center relative">
                        <h1 className="text-3xl font-bold text-gray-900">Make a Payment</h1>
                    </div>

                    {/* 2. Payment Summary Section */}
                    <div className="paymentSummaryCard bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Payment Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Hall Name</span>
                                <span className="font-semibold text-gray-900">Hall 3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Event Date</span>
                                <span className="font-semibold text-gray-900 flex items-center">
                                    <Calendar size={16} className="mr-2 text-gray-400" />
                                    2025/10/25
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Package Selected</span>
                                <span className="font-semibold text-gray-900 flex items-center">
                                    <Package size={16} className="mr-2 text-gray-400" />
                                    Wedding Package
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Amount Due</span>
                                <span className="font-semibold text-gray-900">Rs. 250,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Payment Type</span>
                                <div className="relative">
                                    <select
                                        value={paymentType}
                                        onChange={(e) => setPaymentType(e.target.value)}
                                        className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 pr-8"
                                    >
                                        <option>Advance Payment</option>
                                        <option>Total Payment</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-lg font-bold text-gray-900">Total Amount</span>
                            <span className="text-2xl font-bold text-orange-500">Rs. 250,000</span>
                        </div>
                    </div>

                    {/* 3. Payment Method Selection */}
                    <div className="paymentMethodSection">
                        <label className="block text-sm font-medium text-gray-700 mb-4">Select Payment Method</label>
                        <div className="paymentMethodGrid grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={`paymentMethodBtn flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'card'
                                    ? 'border-orange-500 bg-orange-50/50 text-orange-700'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    }`}
                            >
                                <CreditCard size={24} className={`mr-3 ${paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-400'}`} />
                                <span className="font-semibold">Credit / Debit Card</span>
                            </button>

                            <button
                                onClick={() => setPaymentMethod('bank')}
                                className={`paymentMethodBtn flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'bank'
                                    ? 'border-orange-500 bg-orange-50/50 text-orange-700'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    }`}
                            >
                                <Landmark size={24} className={`mr-3 ${paymentMethod === 'bank' ? 'text-orange-500' : 'text-gray-400'}`} />
                                <span className="font-semibold">Direct Bank Transfer</span>
                            </button>
                        </div>
                    </div>

                    {/* 4. Card Details Form */}
                    {paymentMethod === 'card' && (
                        <div className="creditCardForm bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-300">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Card Details</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="cardInputLabel block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        className="cardInput w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="cardInputLabel block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                    <div className="relative">
                                        <CreditCard size={20} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="cardInputLabel block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="cardInputLabel block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                        <input
                                            type="password"
                                            placeholder="123"
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="save-card"
                                        type="checkbox"
                                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                    <label htmlFor="save-card" className="ml-2 text-sm text-gray-600">Save card for future payments</label>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                                    <Lock size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        All payments are processed securely via encrypted gateway. Your financial information is never stored on our servers.
                                    </p>
                                </div>

                                <button
                                    onClick={handlePaymentSubmit}
                                    className="submitPaymentButton w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                                >
                                    Pay with Card
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Bank Transfer Form */}
                    {paymentMethod === 'bank' && (
                        <div className="bankTransferForm bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-300">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Upload Payment Proof</h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload size={40} className="text-orange-500 mb-4" />
                                            <p className="mb-2 text-sm text-gray-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF (MAX. 5MB)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.svg" />
                                    </label>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg flex items-start border border-blue-100">
                                    <Landmark size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <div className="text-sm text-blue-800">
                                        <p className="font-semibold mb-1">Bank Account Details:</p>
                                        <p>Bank: Sampath Bank</p>
                                        <p>Account Name: Raajeshwary Hall</p>
                                        <p>Account No: 1234 5678 9012</p>
                                        <p>Branch: Colombo 03</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePaymentSubmit}
                                    className="submitPaymentButton w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                                >
                                    Submit Bank Transfer
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HallPayment;
