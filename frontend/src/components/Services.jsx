import React, { useState, useEffect } from 'react';
import { Music, Utensils, Camera, Lightbulb, Flower2, Clock } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    'Decorations': <Flower2 className="serviceIcon text-orange-400" size={32} />,
    'Catering': <Utensils className="serviceIcon text-orange-400" size={32} />,
    'Photography': <Camera className="serviceIcon text-orange-400" size={32} />,
    'Sound & Music': <Music className="serviceIcon text-orange-400" size={32} />,
    'Lighting': <Lightbulb className="serviceIcon text-orange-400" size={32} />,
    'Event Planning': <Clock className="serviceIcon text-orange-400" size={32} />,
    'Sound & Lighting': <Lightbulb className="serviceIcon text-orange-400" size={32} />
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/services');
        const data = await response.json();
        // Fallback if DB is empty but we want to show something
        if (data.length === 0) {
          setServices(defaultServices);
        } else {
          setServices(data.map(s => ({
            serviceId: s.serviceID,
            serviceName: s.serviceName,
            serviceDescription: s.description,
            serviceIcon: iconMap[s.serviceName] || <Flower2 className="serviceIcon text-orange-400" size={32} />
          })));
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const defaultServices = [
    {
      serviceId: 1,
      serviceName: "Decorations",
      serviceDescription: "Elegant floral arrangements and themed decorations",
      serviceIcon: <Flower2 className="serviceIcon text-orange-400" size={32} />
    },
    {
      serviceId: 2,
      serviceName: "Catering",
      serviceDescription: "Delicious multi-cuisine dining experiences",
      serviceIcon: <Utensils className="serviceIcon text-orange-400" size={32} />
    },
    {
      serviceId: 3,
      serviceName: "Photography",
      serviceDescription: "Professional photography and videography",
      serviceIcon: <Camera className="serviceIcon text-orange-400" size={32} />
    },
    {
      serviceId: 4,
      serviceName: "Sound & Music",
      serviceDescription: "Professional audio system and DJ services",
      serviceIcon: <Music className="serviceIcon text-orange-400" size={32} />
    },
    {
      serviceId: 5,
      serviceName: "Lighting",
      serviceDescription: "Ambient and decorative lighting solutions",
      serviceIcon: <Lightbulb className="serviceIcon text-orange-400" size={32} />
    },
    {
      serviceId: 6,
      serviceName: "Event Planning",
      serviceDescription: "Complete event coordination and management",
      serviceIcon: <Clock className="serviceIcon text-orange-400" size={32} />
    }
  ];

  return (
    <section id="services" className="servicesSection">
      <div className="pageContainer">

        {/* Section Header */}
        <div className="sectionHeader">
          <h2 className="sectionTitle">
            Our Event Services
          </h2>
          <p className="sectionDescription">
            Comprehensive services to make your event truly special
          </p>
        </div>

        {/* Services Grid */}
        <div className="layoutResponsiveGrid3">
          {services.map((service) => (
            <div key={service.serviceId} className="serviceCard cardRadius subtleShadow p-8">
              <div className="serviceIconContainer">
                {service.serviceIcon}
              </div>
              <h3 className="serviceCardTitle darkText fontMedium">
                {service.serviceName}
              </h3>
              <p className="serviceCardDescription mutedText">
                {service.serviceDescription}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
