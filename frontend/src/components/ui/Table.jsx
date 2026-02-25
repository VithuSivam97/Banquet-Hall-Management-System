import React from 'react';

export const Table = ({ children, className = '' }) => (
    <div className={`overflow-x-auto ${className}`}>
        <table className="min-w-full divide-y divide-gray-200">
            {children}
        </table>
    </div>
);

export const Thead = ({ children }) => (
    <thead className="bg-gray-50">
        {children}
    </thead>
);

export const Tbody = ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">
        {children}
    </tbody>
);

export const Tr = ({ children, className = '' }) => (
    <tr className={className}>
        {children}
    </tr>
);

export const Th = ({ children, className = '' }) => (
    <th
        scope="col"
        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
        {children}
    </th>
);

export const Td = ({ children, className = '' }) => (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}>
        {children}
    </td>
);
