import React from 'react';
import { Users, MapPin, IndianRupee } from 'lucide-react';
import hall2Image from '../assets/hall2.jpg';
import hall3Image from '../assets/hall3.jpg';

const Halls = () => {
  const hallsList = [
    {
      id: 1,
      hallName: "Hall 1",
      maxGuestCapacity: "500",
      pricePerEvent: "1,20,000",
      hallImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      hallAmenities: ["AC", "Stage", "Parking", "Bar"]
    },
    {
      id: 2,
      hallName: "Hall 2",
      maxGuestCapacity: "600",
      pricePerEvent: "1,20,000",
      hallImage: hall2Image,
      hallAmenities: ["AC", "Kitchen", "Parking", "WiFi"]
    },
    {
      id: 3,
      hallName: "Hall 3",
      maxGuestCapacity: "400",
      pricePerEvent: "1,20,000",
      hallImage: hall3Image,
      hallAmenities: ["AC", "Restrooms", "Parking", "Flexible"]
    }
  ];

  return (
    <section id="halls" className="banquetHallsSection">
      <div className="pageContainer">

        {/* Section Header */}
        <div className="sectionHeader">
          <h2 className="sectionTitle">
            Our Banquet Halls & Packages
          </h2>
          <p className="sectionDescription">
            Choose from our premium selection of elegant venues for your special celebration
          </p>
        </div>

        {/* Halls Grid */}
        <div className="hallsGrid">
          {hallsList.map((hall) => (
            <div key={hall.id} className="hallCard">
              {/* Hall Image Section */}
              <div className="hallImageContainer">
                <img
                  src={hall.hallImage}
                  alt={hall.hallName}
                  className="hallImage"
                />
              </div>

              {/* Hall Information */}
              <div className="hallInfoSection">
                {/* Hall Name */}
                <h3 className="hallCardTitle">
                  {hall.hallName}
                </h3>

                {/* Hall Details */}
                <div className="hallDetailsContainer">
                  <div className="hallDetailRow">
                    <Users size={18} className="primaryText" />
                    <span className="mutedText text-sm">Capacity: {hall.maxGuestCapacity} guests</span>
                  </div>
                  <div className="hallDetailRow">
                    <IndianRupee size={18} className="primaryText" />
                    <span className="mutedText text-sm">Rs: {hall.pricePerEvent}</span>
                  </div>
                </div>

                {/* Hall Amenities */}
                <div className="hallAmenitiesWrapper">
                  {hall.hallAmenities.map((amenity, idx) => (
                    <span key={idx} className="hallAmenityTag">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <button className="hallViewDetailsBtn">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Halls;
