import React from 'react';
import {
    Edit2,
    Trash2,
    Plus,
    Clock,
    Users,
    CheckSquare,
    DollarSign
} from 'lucide-react';
import Button from '../../ui/Button';

const PackageManagement = () => {
    const packages = [
        {
            id: 1,
            name: 'Wedding Platinum',
            price: 12500000,
            description: 'Our premium wedding package includes venue decoration, catering for up to 150 guests, photography, and entertainment.',
            duration: '8 hours',
            capacity: '150-200 guests',
            features: [
                'Premium venue decoration',
                'Full catering service',
                'Professional photography',
                'DJ and entertainment',
                'Wedding cake',
                'Floral arrangements',
            ],
            popular: true,
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
            id: 2,
            name: 'Corporate Conference',
            price: 8000000,
            description: 'Perfect for business conferences and meetings, includes A/V equipment, catering, and setup.',
            duration: '6 hours',
            capacity: '50-200 guests',
            features: [
                'Conference room setup',
                'Audio/visual equipment',
                'Catering (breakfast & lunch)',
                'Technical support',
            ],
            popular: false,
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
            id: 4,
            name: 'Wedding Gold',
            price: 8500000,
            description: 'A comprehensive wedding package for those on a moderate budget without compromising quality.',
            duration: '6 hours',
            capacity: '100-150 guests',
            features: [
                'Standard venue decoration',
                'Catering service',
                'Photography (6 hours)',
                'Basic entertainment',
            ],
            popular: true,
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
                <Button>
                    <Plus size={18} className="mr-2" />
                    Create Package
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div key={pkg.id} className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col items-stretch
            ${pkg.popular ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>

                        <div className="h-48 relative bg-gray-200">
                            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                            {pkg.popular && (
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    POPULAR
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-bold text-gray-900">{pkg.name}</h2>
                            </div>

                            <div className="flex items-center text-xl font-bold text-[#f97316] mb-4">
                                Rs. {pkg.price.toLocaleString()}
                            </div>

                            <p className="text-sm text-gray-600 mb-6 flex-1">{pkg.description}</p>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Features</h3>
                                <ul className="space-y-2">
                                    {pkg.features.slice(0, 4).map((feature, i) => (
                                        <li key={i} className="flex items-start text-sm text-gray-600">
                                            <CheckSquare size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                    {pkg.features.length > 4 && (
                                        <li className="text-xs text-[#f97316] font-medium pl-6 pt-1">
                                            +{pkg.features.length - 4} more features
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-100">
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                                <Edit2 size={16} className="mr-1.5" /> Edit
                            </button>
                            <button className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center">
                                <Trash2 size={16} className="mr-1.5" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageManagement;
