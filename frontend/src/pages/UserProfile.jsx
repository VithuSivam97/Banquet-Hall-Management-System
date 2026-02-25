import React, { useState } from 'react';
import { Bell, User, Edit, Lock, Trash2, Calendar, CheckCircle, Clock, Star, MessageSquare, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';

const UserProfile = () => {
    const [profile, setProfile] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem('user')) || {};
        return {
            name: savedUser.name || 'Client',
            email: savedUser.email || 'not-provided@example.com',
            phone: savedUser.phone || ''
        };
    });
    const [isEditing, setIsEditing] = useState(false);

    const getInitials = (fullName) => {
        if (!fullName) return 'U';
        return fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <div className="dashboardWrapper pt-20">
            <Navbar showMyInfo={false} />

            <main className="dashboardMain">
                <div className="profileGrid">
                    <div className="profileSidebar">
                        <div className="infoCard cardRadius subtleShadow flex flex-col items-center">
                            <div className="avatarContainer group">
                                <div className="profileAvatar circleRadius">
                                    {getInitials(profile.name)}
                                </div>
                                <label className="avatarOverlay circleRadius opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity flex items-center justify-center">
                                    <Edit size={24} className="onPrimaryText" />
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold darkText">{profile.name}</h3>
                        </div>

                        <div className="infoCard cardRadius subtleShadow">
                            <div className="infoCardHeader">
                                <h4 className="font-medium darkText">Personal Details</h4>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="footerLinkButton text-sm font-medium inlineAlignedGroupMd"
                                >
                                    <Edit size={16} />
                                    {isEditing ? 'Save' : 'Edit'}
                                </button>
                            </div>

                            <div className="formFieldsList">
                                <div className="formFieldGroup relative">
                                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        readOnly={!isEditing}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className={`formInput !pl-10 ${!isEditing ? 'softSurface border-transparent shadow-none cursor-default' : ''}`}
                                    />
                                </div>
                                <div className="formFieldGroup relative">
                                    <MessageSquare size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        readOnly={!isEditing}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className={`formInput !pl-10 ${!isEditing ? 'bg-gray-50 border-transparent shadow-none cursor-default' : ''}`}
                                    />
                                </div>
                                <div className="formFieldGroup relative">
                                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={profile.phone}
                                        readOnly={!isEditing}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        className={`formInput !pl-10 ${!isEditing ? 'bg-gray-50 border-transparent shadow-none cursor-default' : ''}`}
                                    />
                                </div>
                                <div className="formFieldGroup relative">
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        value={profile.street || ''}
                                        readOnly={!isEditing}
                                        onChange={(e) => setProfile({ ...profile, street: e.target.value })}
                                        className={`formInput ${!isEditing ? 'bg-gray-50 border-transparent shadow-none cursor-default' : ''}`}
                                    />
                                </div>
                                <div className="formFieldGroup relative">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={profile.city || ''}
                                        readOnly={!isEditing}
                                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                        className={`formInput ${!isEditing ? 'bg-gray-50 border-transparent shadow-none cursor-default' : ''}`}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 actionButtonsGroup">
                                <button className="inlineAlignedGroupMd text-sm text-gray-700 hover:primaryText transition-colors group w-full text-left">
                                    <div className="p-1 group-hover:accentHighlight cardRadius">
                                        <Lock size={16} />
                                    </div>
                                    <span>Change Password</span>
                                </button>
                                <button className="inlineAlignedGroupMd text-sm errorText hover:text-red-700 transition-colors group w-full text-left">
                                    <div className="p-1 errorSurface group-hover:bg-red-100 cardRadius">
                                        <Trash2 size={16} />
                                    </div>
                                    <span>Deactivate Account</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="profileContentArea space-y-8">
                        <div className="infoCard subtleShadow p-0 cardRadius">
                            <div className="cardHeaderContent">
                                <h4 className="fontMedium darkText">My Booking History</h4>
                                <button className="footerLinkButton text-sm fontMedium">View All</button>
                            </div>
                            <div className="tableWrapper">
                                <table className="dataTable">
                                    <thead>
                                        <tr>
                                            <th className="tableHeaderCell">Hall Name</th>
                                            <th className="tableHeaderCell">Date</th>
                                            <th className="tableHeaderCell">Event</th>
                                            <th className="tableHeaderCell">Payment</th>
                                            <th className="tableHeaderCell">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="tableBodyRow">
                                            <td className="tableCell font-medium">Hall 1</td>
                                            <td className="tableCell">2025/06/14</td>
                                            <td className="tableCell">Wedding</td>
                                            <td className="tableCell">Paid</td>
                                            <td className="tableCell">
                                                <span className="statusBadge statusBadgeCompleted">
                                                    <CheckCircle size={12} />
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="tableBodyRow">
                                            <td className="tableCell font-medium">Hall 2</td>
                                            <td className="tableCell">2025/10/25</td>
                                            <td className="tableCell">Birthday</td>
                                            <td className="tableCell">Partially Paid</td>
                                            <td className="tableCell">
                                                <span className="statusBadge statusBadgeUpcoming">
                                                    <Clock size={12} />
                                                    Upcoming
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="layoutResponsiveGrid2">
                            <div className="infoCard flex flex-col h-full cardRadius subtleShadow">
                                <div className="subHeaderInlineGroup">
                                    <Star size={20} className="primaryText" fill="#f97316" />
                                    <h4 className="fontMedium darkText">Feedback History</h4>
                                </div>

                                <div className="softSurface cardRadius p-4 flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm fontMedium darkText">Hall 3</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4].map((i) => (
                                                <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                                            ))}
                                            <Star size={14} className="text-gray-300" />
                                        </div>
                                    </div>
                                    <p className="smallItalicText mutedText">
                                        "Great service and beautiful venue. The staff was very helpful."
                                    </p>
                                    <p className="timestampLabel">June 20, 2023</p>
                                </div>

                                <button className="mt-4 footerLinkButton text-xs font-semibold text-center w-full">
                                    View All Feedback
                                </button>
                            </div>

                            <div className="infoCard flex flex-col h-full cardRadius subtleShadow">
                                <div className="subHeaderInlineGroup">
                                    <Bell size={20} className="primaryText" />
                                    <h4 className="fontMedium darkText">Notifications</h4>
                                </div>

                                <div className="space-y-3 flex-1">
                                    <div className="accentHighlight border-l-4 border-brand-primary rounded-r-lg p-3">
                                        <p className="text-xs fontMedium darkText">Payment Confirmation</p>
                                        <p className="timestampLabel mt-0.5">Your payment for Riverside Banquet has been confirmed.</p>
                                        <span className="timestampLabel mt-2 block">2 days ago</span>
                                    </div>
                                    <div className="softSurface border-l-4 subtleBorder rounded-r-lg p-3">
                                        <p className="text-xs fontMedium darkText">Booking Update</p>
                                        <p className="timestampLabel mt-0.5">Your booking details have been updated by the coordinator.</p>
                                        <span className="timestampLabel mt-2 block">5 days ago</span>
                                    </div>
                                </div>

                                <button className="mt-4 footerLinkButton text-xs font-semibold text-center w-full">
                                    View All Notifications
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserProfile;
