import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../ui/Card';

const PlaceholderPage = () => {
    const location = useLocation();
    const pageName = location.pathname.split('/').pop();
    const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">{formattedName}</h1>
            <Card className="p-12 text-center text-gray-500">
                <h2 className="text-xl font-medium mb-2">Coming Soon</h2>
                <p>The {formattedName} management module is currently under development.</p>
            </Card>
        </div>
    );
};

export default PlaceholderPage;
