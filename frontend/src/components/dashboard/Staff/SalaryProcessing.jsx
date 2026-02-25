import React from 'react';
import { Printer, ChevronDown } from 'lucide-react';
import Button from '../../ui/Button';

const SalaryProcessing = () => {
    // Mock Data as per request
    const salaryHistory = [
        {
            id: 'P001',
            staffId: 'S012',
            name: 'Arun Kumar',
            category: 'Decoration',
            basicSalary: '85,000',
            bonus: '5,000',
            deductions: '0',
            totalPay: '90,000',
            method: 'Bank Transfer',
            date: '2025/10/05'
        },
        {
            id: 'P002',
            staffId: 'S015',
            name: 'Ramesh Chandran',
            category: 'Cooking',
            basicSalary: '85,000',
            bonus: '0',
            deductions: '3,000',
            totalPay: '82,000',
            method: 'Cash',
            date: '2025/10/05'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* 1. Process Salary Payment Section */}
            <div className="salaryProcessContainer bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Process Salary Payment</h2>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        {/* Step 1 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Step 1: Select Staff Category</label>
                            <div className="relative">
                                <select className="w-full appearance-none px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent cursor-pointer">
                                    <option value="" disabled selected>Choose category...</option>
                                    <option value="Logistics">Logistics</option>
                                    <option value="Catering">Catering</option>
                                    <option value="Decoration">Decoration</option>
                                    <option value="Cleaning">Cleaning</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Step 2: Select Staff Member</label>
                            <div className="relative">
                                <select className="w-full appearance-none px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent cursor-pointer">
                                    <option value="" disabled selected>Choose staff...</option>
                                    <option value="S012">Arun Kumar</option>
                                    <option value="S015">Ramesh Chandran</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button className="px-6 py-2.5 bg-[#f97316] text-white font-medium rounded-lg hover:bg-[#ea580c] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Salary History Table */}
            <div className="salaryHistoryTable bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-[#f97316]">
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Payment ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Staff ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">Basic Salary</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">Bonus</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">Deductions</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">Total Pay</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Method</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Payment Date</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="historyTableBody bg-white divide-y divide-gray-200">
                            {salaryHistory.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.staffId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{record.basicSalary}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 text-right">
                                        {record.bonus !== '0' ? `+${record.bonus}` : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500 text-right">
                                        {record.deductions !== '0' ? `-${record.deductions}` : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black text-right">{record.totalPay}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {record.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{record.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button className="text-amber-700 hover:text-amber-900 transition-colors p-2 hover:bg-amber-50 rounded-full" title="Print Receipt">
                                            <Printer size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalaryProcessing;
