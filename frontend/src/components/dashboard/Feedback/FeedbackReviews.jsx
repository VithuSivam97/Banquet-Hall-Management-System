import React, { useState } from 'react';
import { Search, Filter, Star, ChevronDown, MoreHorizontal } from 'lucide-react';
import Button from '../../ui/Button';

const FeedbackReviews = () => {
    const [activeTab, setActiveTab] = useState('all');

    // Sample Review Data
    const reviews = [
        {
            id: 1,
            reviewer: 'Piraveena',
            date: '2026/03/15',
            rating: 5,
            content: 'Absolutely amazing service! Our wedding was perfect in every way and the staff handled everything beautifully.',
            eventType: 'Wedding',
            venue: 'Hall 1'
        },
        {
            id: 2,
            reviewer: 'Ganamoorthy',
            date: '2026/02/10',
            rating: 5,
            content: 'The conference facilities were excellent and the staff was very professional throughout the event.',
            eventType: 'Corporate',
            venue: 'Hall 2'
        },
        {
            id: 3,
            reviewer: 'Abivarman',
            date: '2026/02/06',
            rating: 5,
            content: "My daughter's birthday party was a dream come true! The decorations were perfect and everyone loved it.",
            eventType: 'Birthday',
            venue: 'Hall 3'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Feedback & Reviews</h1>
                    <p className="text-sm text-gray-500">View and manage customer feedback.</p>
                </div>
            </div>

            {/* 1. Filter & Search Controls */}
            <div className="reviewFilterActions bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">

                    {/* Tabs */}
                    <div className="flex space-x-6 border-b border-transparent w-full md:w-auto overflow-x-auto">
                        <button
                            className={`pb-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'all' ? 'text-[#f97316] border-b-2 border-[#f97316]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Reviews
                        </button>
                        <button
                            className={`pb-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'highlighted' ? 'text-[#f97316] border-b-2 border-[#f97316]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('highlighted')}
                        >
                            Highlighted
                        </button>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {/* Rating Filter */}
                            <div className="relative">
                                <select className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer">
                                    <option>All Ratings</option>
                                    <option>5 Stars</option>
                                    <option>4 Stars</option>
                                    <option>3 Stars</option>
                                    <option>2 Stars</option>
                                    <option>1 Star</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>

                            {/* Event Type Filter */}
                            <div className="relative">
                                <select className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer">
                                    <option>All Event Types</option>
                                    <option>Wedding</option>
                                    <option>Corporate</option>
                                    <option>Birthday</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>

                            {/* Venue Filter */}
                            <div className="relative">
                                <select className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer">
                                    <option>All Venues</option>
                                    <option>Hall 1</option>
                                    <option>Hall 2</option>
                                    <option>Hall 3</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Review List Section */}
            <div className="reviewCardList space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="customerReviewCard bg-white rounded-xl shadow-sm border-l-4 border-yellow-400 border-t border-r border-b border-gray-200 p-6 flex flex-col sm:flex-row gap-6 transition-shadow hover:shadow-md">

                        {/* Reviewer Info */}
                        <div className="flex-shrink-0 sm:w-48">
                            <h3 className="text-lg font-bold text-gray-900">{review.reviewer}</h3>
                            <p className="text-sm text-gray-500 mb-1">{review.date}</p>
                            <div className="text-xs text-gray-400 flex flex-col gap-1 mt-2">
                                <span className="inline-flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-100 w-fit">
                                    {review.eventType}
                                </span>
                                <span className="inline-flex items-center bg-gray-50 px-2 py-1 rounded border border-gray-100 w-fit">
                                    {review.venue}
                                </span>
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1">
                            <div className="flex items-center mb-3">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            fill={i < review.rating ? "currentColor" : "none"}
                                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-600">{review.rating}.0</span>
                            </div>
                            <p className="reviewTextContent text-gray-700 leading-relaxed">
                                "{review.content}"
                            </p>
                        </div>

                        <div className="flex-shrink-0 flex sm:flex-col justify-end sm:justify-start gap-2">
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackReviews;
