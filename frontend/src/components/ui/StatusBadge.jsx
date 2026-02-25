import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyles = (status) => {
        const lowerStatus = status.toLowerCase();

        switch (lowerStatus) {
            case 'active':
            case 'confirmed':
            case 'completed':
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
            case 'in progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
            case 'cancelled':
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyles(status)}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
