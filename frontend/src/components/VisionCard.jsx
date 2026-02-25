import React from 'react';
import { Eye, Target, TrendingUp } from 'lucide-react';

const iconMap = {
    vision: Eye,
    mission: Target,
    goals: TrendingUp,
};

const VisionCard = ({ title, description, icon }) => {
    const IconComponent = iconMap[icon] || Eye;

    return (
        <div className="featureCard h-full flex flex-col items-center">
            <div className="featureIconContainer bg-orange-100 p-4 rounded-full mb-6">
                <IconComponent className="primaryText" size={32} />
            </div>
            <h3 className="featureTitle">{title}</h3>
            <p className="featureDescription">{description}</p>
        </div>
    );
};

export default VisionCard;
