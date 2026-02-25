import React, { useState } from 'react'
import {
    Bell,
    Calendar,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    DollarSign,
    MessageSquare,
    Star,
    User,
    Package,
} from 'lucide-react'
const NotificationsCenter = () => {
    const [activeFilter, setActiveFilter] = useState('all')
    // Mock data for notifications
    const notifications = [
        {
            id: 1,
            type: 'booking',
            title: 'New Booking Request',
            message:
                'John Smith has requested a booking for Wedding event on September 15, 2023.',
            time: '10 minutes ago',
            read: false,
            action: 'approve',
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Received',
            message:
                'Sarah Johnson has completed the payment of $3,500 for her Birthday Party event.',
            time: '1 hour ago',
            read: false,
            action: 'view',
        },
        {
            id: 3,
            type: 'event',
            title: 'Event Starting Soon',
            message:
                'The "Tech Corp Conference" event is scheduled to start in 2 hours.',
            time: '2 hours ago',
            read: true,
            action: 'view',
        },
        {
            id: 4,
            type: 'inventory',
            title: 'Low Stock Alert',
            message:
                'Table Runners (White) inventory has fallen below the minimum threshold.',
            time: '3 hours ago',
            read: true,
            action: 'restock',
        },
        {
            id: 5,
            type: 'vendor',
            title: 'New Vendor Registration',
            message:
                'Sweet Dreams Bakery has submitted a registration to become a vendor partner.',
            time: '5 hours ago',
            read: false,
            action: 'approve',
        },
        {
            id: 6,
            type: 'feedback',
            title: 'New Client Feedback',
            message:
                'Michael Brown has left a 5-star review for the Johnson Wedding event.',
            time: '8 hours ago',
            read: true,
            action: 'view',
        },
        {
            id: 7,
            type: 'booking',
            title: 'Booking Cancellation',
            message:
                'Emily Davis has cancelled her booking for the Conference event on September 25, 2023.',
            time: '10 hours ago',
            read: true,
            action: 'view',
        },
        {
            id: 8,
            type: 'staff',
            title: 'Staff Assignment',
            message:
                'Lisa Thompson has been assigned to the Smith Birthday event on September 20, 2023.',
            time: '12 hours ago',
            read: true,
            action: 'view',
        },
        {
            id: 9,
            type: 'payment',
            title: 'Payment Reminder',
            message:
                'Payment reminder sent to David Wilson for the Corporate Mixer event.',
            time: '1 day ago',
            read: true,
            action: 'view',
        },
        {
            id: 10,
            type: 'system',
            title: 'System Update Completed',
            message:
                'The system has been updated to version 2.5.0 with new features and improvements.',
            time: '2 days ago',
            read: true,
            action: 'view',
        },
    ]
    // Filter notifications based on active filter
    const filteredNotifications =
        activeFilter === 'all'
            ? notifications
            : activeFilter === 'unread'
                ? notifications.filter((notification) => !notification.read)
                : notifications.filter(
                    (notification) => notification.type === activeFilter,
                )
    // Count unread notifications
    const unreadCount = notifications.filter(
        (notification) => !notification.read,
    ).length
    // Get icon for notification type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'booking':
                return <Calendar className="h-6 w-6 text-blue-500" />
            case 'payment':
                return <DollarSign className="h-6 w-6 text-green-500" />
            case 'event':
                return <Clock className="h-6 w-6 text-purple-500" />
            case 'inventory':
                return <Package className="h-6 w-6 text-red-500" />
            case 'vendor':
                return <User className="h-6 w-6 text-indigo-500" />
            case 'feedback':
                return <Star className="h-6 w-6 text-yellow-500" />
            case 'staff':
                return <User className="h-6 w-6 text-teal-500" />
            case 'system':
                return <AlertCircle className="h-6 w-6 text-gray-500" />
            default:
                return <Bell className="h-6 w-6 text-gray-500" />
        }
    }
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    Notifications Center
                </h1>
                <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                        {unreadCount} unread notifications
                    </span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                        Mark All as Read
                    </button>
                </div>
            </div>
            {/* Notification Filters */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="border-b overflow-x-auto">
                    <nav className="flex p-4">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`px-3 py-2 text-sm font-medium rounded-md mr-2 ${activeFilter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveFilter('unread')}
                            className={`px-3 py-2 text-sm font-medium rounded-md mr-2 ${activeFilter === 'unread' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            Unread
                        </button>
                        <button
                            onClick={() => setActiveFilter('booking')}
                            className={`px-3 py-2 text-sm font-medium rounded-md mr-2 ${activeFilter === 'booking' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            Bookings
                        </button>
                        <button
                            onClick={() => setActiveFilter('payment')}
                            className={`px-3 py-2 text-sm font-medium rounded-md mr-2 ${activeFilter === 'payment' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            Payments
                        </button>
                        <button
                            onClick={() => setActiveFilter('event')}
                            className={`px-3 py-2 text-sm font-medium rounded-md mr-2 ${activeFilter === 'event' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            Events
                        </button>
                        <button
                            onClick={() => setActiveFilter('inventory')}
                            className={`px-3 py-2 text-sm font-medium rounded-md mr-2 ${activeFilter === 'inventory' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            Inventory
                        </button>
                        <button
                            onClick={() => setActiveFilter('feedback')}
                            className={`px-3 py-2 text-sm font-medium rounded-md mr-2 ${activeFilter === 'feedback' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        >
                            Feedback
                        </button>
                    </nav>
                </div>
                {/* Notifications List */}
                <div className="divide-y divide-gray-200">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-6 text-center">
                            <Bell className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No notifications
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                No {activeFilter !== 'all' ? activeFilter : ''} notifications to
                                display.
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-medium text-gray-900">
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {notification.time}
                                            </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {notification.message}
                                        </p>
                                        <div className="mt-2 flex space-x-3">
                                            {notification.action === 'approve' && (
                                                <>
                                                    <button className="text-sm text-green-600 hover:text-green-900 font-medium flex items-center">
                                                        <CheckCircle size={16} className="mr-1" /> Approve
                                                    </button>
                                                    <button className="text-sm text-red-600 hover:text-red-900 font-medium flex items-center">
                                                        <XCircle size={16} className="mr-1" /> Reject
                                                    </button>
                                                </>
                                            )}
                                            {notification.action === 'restock' && (
                                                <button className="text-sm text-blue-600 hover:text-blue-900 font-medium">
                                                    Restock Now
                                                </button>
                                            )}
                                            {notification.action === 'view' && (
                                                <button className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">
                                                    View Details
                                                </button>
                                            )}
                                            {!notification.read && (
                                                <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                                                    Mark as Read
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Pagination */}
                {filteredNotifications.length > 0 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to{' '}
                                <span className="font-medium">
                                    {filteredNotifications.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {filteredNotifications.length}
                                </span>{' '}
                                notifications
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
                                    disabled
                                >
                                    Previous
                                </button>
                                <button
                                    className="px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
                                    disabled
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default NotificationsCenter
