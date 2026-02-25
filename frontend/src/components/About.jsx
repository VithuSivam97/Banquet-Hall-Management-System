import React from 'react';
import { Award, Users, Sparkles } from 'lucide-react';

const About = () => {
  const features = [
    {
      featureIcon: <Award className="primaryText" size={40} />,
      featureTitle: "Premium Quality",
      featureDescription: "State-of-the-art facilities with world-class amenities for an unforgettable experience.",
    },
    {
      featureIcon: <Users className="primaryText" size={40} />,
      featureTitle: "Expert Team",
      featureDescription: "Professional staff dedicated to making your event perfect in every detail.",
    },
    {
      featureIcon: <Sparkles className="primaryText" size={40} />,
      featureTitle: "Custom Solutions",
      featureDescription: "Tailored packages and services designed specifically for your unique needs.",
    },
  ];

  return (
    <section id="about" className="aboutSection">
      <div className="pageContainer">

        {/* Section Header */}
        <div className="sectionHeader">
          <h2 className="sectionTitle">
            Why Choose Raajeshwary Hall?
          </h2>
          <p className="sectionDescription">
            We provide the perfect blend of elegance, comfort, and professional service for your most cherished celebrations
          </p>
        </div>

        {/* Features Grid */}
        <div className="layoutResponsiveGrid3 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="featureCard cardRadius accentHighlight p-8 text-center transition-all hover:subtleShadow">
              <div className="featureIconContainer mb-4 flex justify-center">
                {feature.featureIcon}
              </div>
              <h3 className="featureTitle darkText fontMedium text-xl mb-2">
                {feature.featureTitle}
              </h3>
              <p className="featureDescription mutedText text-sm leading-relaxed">
                {feature.featureDescription}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="primarySurface onPrimaryText cardRadius p-12 text-center subtleShadow">
          <h3 className="text-2xl font-bold mb-4">
            Our Mission
          </h3>
          <p className="text-lg opacity-90 leading-relaxed max-w-3xl mx-auto">
            To create unforgettable experiences by providing premium venues and exceptional service,
            ensuring your special moments are celebrated with elegance and joy.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
