import React from 'react';

const ServiceCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="serviceCard h-full flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
            <div className="serviceIconContainer">
                <Icon className="serviceIcon" />
            </div>
            <h3 className="serviceCardTitle">{title}</h3>
            <p className="serviceCardDescription">
                {description}
            </p>
        </div>
    );
};

export default ServiceCard;
