import React from 'react';
import {
    ClipboardList,
    Calendar,
    MapPin,
    Clock,
    CheckCircle,
    MoreHorizontal
} from 'lucide-react';
import Button from '../../ui/Button';

const EventTracking = () => {
    // Mock data for events
    const events = [
        {
            id: 1,
            name: 'Kunalan Wedding',
            date: '2025-04-15',
            time: '16:00 - 22:00',
            location: 'Hall 1',
            status: 'In Progress',
            progress: 75,
            tasks: [
                { id: 1, name: 'Venue Setup', status: 'completed', assignee: 'Sathushan' },
                { id: 2, name: 'Catering Delivery', status: 'completed', assignee: 'Jathupriyan' },
                { id: 3, name: 'Flower Arrangements', status: 'in-progress', assignee: 'Piraveena' },
                { id: 4, name: 'DJ Setup', status: 'pending', assignee: 'Abijan' },
            ],
        },
        {
            id: 2,
            name: 'Tech Corp Conference',
            date: '2025-04-18',
            time: '09:00 - 17:00',
            location: 'Hall 2',
            status: 'Upcoming',
            progress: 40,
            tasks: [
                { id: 1, name: 'Stage Setup', status: 'completed', assignee: 'Anujan' },
                { id: 2, name: 'A/V Equipment', status: 'in-progress', assignee: 'Abijan' },
                { id: 3, name: 'Registration Desk', status: 'pending', assignee: 'Sancika' },
            ],
        },
        {
            id: 3,
            name: 'Sathu Birthday',
            date: '2025-04-20',
            time: '18:00 - 23:00',
            location: 'Hall 3',
            status: 'Upcoming',
            progress: 60,
            tasks: [
                { id: 1, name: 'Decoration', status: 'completed', assignee: 'Sancika' },
                { id: 2, name: 'Cake Delivery', status: 'in-progress', assignee: 'Piraveena' },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Event Tracking</h1>
                <div className="mt-3 sm:mt-0 flex space-x-2">
                    <Button variant="secondary">Calendar View</Button>
                    <Button>+ Add Event</Button>
                </div>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">{event.name}</h2>
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                        <Calendar size={14} className="mr-1.5" /> {event.date}
                                    </div>
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                        <Clock size={14} className="mr-1.5" /> {event.time}
                                    </div>
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                        <MapPin size={14} className="mr-1.5" /> {event.location}
                                    </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${event.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {event.status}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-gray-500">Progress</span>
                                    <span className="text-xs font-medium text-gray-700">{event.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-[#f97316] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${event.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Task List */}
                        <div className="p-6 flex-1 bg-gray-50/50">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Task Status</h3>
                            <ul className="space-y-3">
                                {event.tasks.map((task) => (
                                    <li key={task.id} className="flex items-start">
                                        <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5
                      ${task.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-gray-100 text-gray-400'}`}>
                                            {task.status === 'completed' ? <CheckCircle size={12} /> : <div className="h-2 w-2 rounded-full bg-current" />}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-gray-900">{task.name}</p>
                                            <p className="text-xs text-gray-500">Assigned: {task.assignee}</p>
                                        </div>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize
                      ${task.status === 'completed' ? 'bg-green-50 text-green-700' :
                                                task.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                                                    'bg-gray-100 text-gray-600'}`}>
                                            {task.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center">
                            <button className="text-sm font-medium text-[#f97316] hover:text-[#ea580c]">View Details</button>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventTracking;
