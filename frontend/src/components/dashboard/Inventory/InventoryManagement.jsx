import React, { useState } from 'react';
import {
    Search,
    Plus,
    AlertCircle
} from 'lucide-react';
import Button from '../../ui/Button';

const InventoryManagement = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const inventoryItems = [
        {
            id: 1,
            name: 'Round Tables (60")',
            category: 'furniture',
            quantity: 50,
            available: 35,
            threshold: 10,
            location: 'Main Warehouse',
            lowStock: false,
        },
        {
            id: 2,
            name: 'Chiavari Chairs',
            category: 'furniture',
            quantity: 200,
            available: 150,
            threshold: 40,
            location: 'Main Warehouse',
            lowStock: false,
        },
        {
            id: 3,
            name: 'Table Runners (White)',
            category: 'linens',
            quantity: 60,
            available: 8,
            threshold: 10,
            location: 'Linen Storage',
            lowStock: true,
        },
        {
            id: 4,
            name: 'LED Uplights',
            category: 'decor',
            quantity: 30,
            available: 5,
            threshold: 5,
            location: 'AV Room',
            lowStock: true,
        }
    ];

    const filteredItems = activeCategory === 'all'
        ? inventoryItems
        : inventoryItems.filter(item => item.category === activeCategory);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <Button>
                    <Plus size={18} className="mr-2" /> Add Item
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-end">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Levels</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredItems.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            <span className="font-medium">{item.available}</span> / {item.quantity} available
                                        </div>
                                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1.5">
                                            <div
                                                className={`h-1.5 rounded-full ${item.lowStock ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${(item.available / item.quantity) * 100}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {item.location}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.lowStock ? (
                                            <span className="inline-flex items-center text-xs font-medium text-red-600">
                                                <AlertCircle size={14} className="mr-1" /> Low Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center text-xs font-medium text-green-600">
                                                In Stock
                                            </span>
                                        )}
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

export default InventoryManagement;
