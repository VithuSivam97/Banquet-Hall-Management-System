import React from 'react';
import Card from '../../ui/Card';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                    <Icon size={24} />
                </div>
            </div>
            {(trend || trendValue) && (
                <div className="mt-4 flex items-center text-sm">
                    {trend === 'up' && (
                        <span className="text-green-600 font-medium flex items-center">
                            ↑ {trendValue}
                        </span>
                    )}
                    {trend === 'down' && (
                        <span className="text-red-600 font-medium flex items-center">
                            ↓ {trendValue}
                        </span>
                    )}
                    <span className="text-gray-500 ml-2">from last month</span>
                </div>
            )}
        </Card>
    );
};

export default StatCard;
