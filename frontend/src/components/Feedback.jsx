import React from 'react';
import { Star } from 'lucide-react';

const Feedback = () => {
    const clientFeedback = [
        {
            feedbackId: 1,
            clientName: "Kanistan",
            eventType: "Wedding Reception",
            feedbackText: "An absolute wonderful experience! The team at Raajeshwary Hall made our special day unforgettable with their exceptional service and attention to detail.",
            clientRating: 5,
            clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        },
        {
            feedbackId: 2,
            clientName: "Dilaxshan",
            eventType: "Wedding Celebration",
            feedbackText: "Outstanding venue and amazing staff! They handled everything perfectly and made sure our wedding was nothing short of magical.",
            clientRating: 5,
            clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        },
        {
            feedbackId: 3,
            clientName: "Sri Somash",
            eventType: "Grand Banquet",
            feedbackText: "Raajeshwary Hall is the perfect choice for any celebration. Elegant venue, delicious catering, and professional service. Highly recommended!",
            clientRating: 5,
            clientImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
        }
    ];

    return (
        <section id="feedback" className="feedbackSection">
            <div className="pageContainer">

                {/* Section Header */}
                <div className="sectionHeader">
                    <h2 className="sectionTitle">
                        What Our Clients Say
                    </h2>
                    <p className="sectionDescription">
                        Real feedback from our happy clients who celebrated their special moments with us
                    </p>
                </div>

                {/* Feedback Grid */}
                <div className="feedbackGrid">
                    {clientFeedback.map((item) => (
                        <div key={item.feedbackId} className="feedbackCard cardRadius">
                            {/* Star Rating */}
                            <div className="ratingContainer">
                                {[...Array(item.clientRating)].map((_, i) => (
                                    <Star key={i} size={16} className="ratingIcon" />
                                ))}
                            </div>

                            {/* Client Feedback */}
                            <p className="feedbackContent">
                                "{item.feedbackText}"
                            </p>

                            {/* Client Info */}
                            <div className="clientInfo inlineAlignedGroupLg">
                                <img
                                    src={item.clientImage}
                                    alt={item.clientName}
                                    className="clientAvatar circleRadius"
                                />
                                <div className="clientDetails">
                                    <h4 className="clientName">
                                        {item.clientName}
                                    </h4>
                                    <p className="eventTag">
                                        {item.eventType}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Feedback;
