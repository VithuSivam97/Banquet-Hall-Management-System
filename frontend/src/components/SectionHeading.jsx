import React from 'react';

const SectionHeading = ({ children }) => {
    return (
        <div className="sectionHeader mb-8">
            <h2 className="sectionTitle">
                {children}
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>
    );
};

export default SectionHeading;
