import React, { useState } from 'react';
import {
    Search,
    UserPlus,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Star,
    Edit2,
    Trash2,
    Briefcase,
    DollarSign,
    CheckCircle,
    Plus,
    Filter,
    MoreHorizontal,
    FileText as FileTextIcon
} from 'lucide-react';
import Button from '../../ui/Button';
import AssignTaskModal from './AssignTaskModal';
import SalaryProcessing from './SalaryProcessing';
import AddStaffModal from './AddStaffModal';

const StaffManagement = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

    const staffMembers = [
        {
            id: 1,
            name: 'Piraveena',
            position: 'Event Manager',
            email: 'piya0322@gmail.com',
            phone: '+94 77 123 4567',
            location: 'Nallur, Jaffna',
            joinDate: '2020-05-15',
            status: 'active',
            rating: 4.8,
            image: 'https://randomuser.me/api/portraits/women/12.jpg',
        },
        {
            id: 2,
            name: 'Anujan',
            position: 'Catering Supervisor',
            email: 'anukumar1216@gmail.com',
            phone: '+94 76 234 5678',
            location: 'Kondavil, Jaffna',
            joinDate: '2021-02-10',
            status: 'active',
            rating: 4.5,
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            id: 3,
            name: 'Sancika',
            position: 'Decoration Specialist',
            email: 'sancikasathes14@gmail.com',
            phone: '+94 71 345 6789',
            location: 'Kokuvil, Jaffna',
            joinDate: '2019-11-22',
            status: 'active',
            rating: 4.9,
            image: 'https://randomuser.me/api/portraits/women/22.jpg',
        },
        {
            id: 4,
            name: 'Abijan',
            position: 'Technical Support',
            email: 'abijan@example.com',
            phone: '+94 77 456 7890',
            location: 'Chunnakam, Jaffna',
            joinDate: '2022-01-05',
            status: 'active',
            rating: 4.6,
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
        },
        {
            id: 5,
            name: 'Jeenuya',
            position: 'Client Coordinator',
            email: 'jeenujothy44@gmail.com',
            phone: '+94 76 567 8901',
            location: 'Manipay, Jaffna',
            joinDate: '2020-08-30',
            status: 'inactive',
            rating: 4.7,
            image: 'https://randomuser.me/api/portraits/women/45.jpg',
        }
    ];

    // Mock Data for Tasks
    const tasks = [
        {
            id: 'T001',
            staffId: 'S012',
            staffName: 'Arun Kumar',
            category: 'Logistics',
            taskTitle: 'Stage Setup for Wedding',
            assignedDate: '2026/10/05',
            deadline: '2026/10/10',
            priority: 'High',
            status: 'In Progress'
        },
        {
            id: 'T002',
            staffId: 'S015',
            staffName: 'Ramesh Chandran',
            category: 'Catering',
            taskTitle: 'Prepare Dinner Menu',
            assignedDate: '2026/10/06',
            deadline: '2026/10/12',
            priority: 'Medium',
            status: 'Pending'
        },
        {
            id: 'T003',
            staffId: 'S008',
            staffName: 'Sancika S.',
            category: 'Decoration',
            taskTitle: 'Floral Arrangement Hall 1',
            assignedDate: '2026/10/01',
            deadline: '2026/10/05',
            priority: 'High',
            status: 'Completed'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
                    <p className="text-sm text-gray-500">Manage your team, assignments, and payroll.</p>
                </div>
                {activeTab === 'list' && (
                    <Button onClick={() => setIsAddStaffModalOpen(true)}>
                        <UserPlus size={18} className="mr-2" />
                        Add Staff Member
                    </Button>
                )}
            </div>

            {/* Admin Top Bar Navigation */}
            <div className="adminTopBar border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'list'
                            ? 'border-[#f97316] text-[#f97316]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Staff List
                    </button>
                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'tasks'
                            ? 'border-[#f97316] text-[#f97316]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Assign Task
                    </button>
                    <button
                        onClick={() => setActiveTab('salary')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'salary'
                            ? 'border-[#f97316] text-[#f97316]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Salary Payment
                    </button>
                </nav>
            </div>

            {/* Tab: Staff List */}
            {activeTab === 'list' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search staff..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] bg-white">
                                    <option>All Positions</option>
                                    <option>Event Manager</option>
                                    <option>Catering</option>
                                </select>
                                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] bg-white">
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Staff Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {staffMembers.map((staff) => (
                            <div key={staff.id} className={`bg-white rounded-lg shadow-sm border overflow-hidden relative
                                ${staff.status === 'active' ? 'border-t-4 border-t-green-500' : 'border-t-4 border-t-gray-300'}`}>

                                <div className="p-6">
                                    <div className="flex items-start">
                                        <img src={staff.image} alt={staff.name} className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                        <div className="ml-4 flex-1">
                                            <h2 className="text-lg font-bold text-gray-900">{staff.name}</h2>
                                            <p className="text-sm text-[#f97316] font-medium">{staff.position}</p>

                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Mail size={16} className="text-gray-400 mr-3" />
                                            {staff.email}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Phone size={16} className="text-gray-400 mr-3" />
                                            {staff.phone}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin size={16} className="text-gray-400 mr-3" />
                                            {staff.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar size={16} className="text-gray-400 mr-3" />
                                            Joined {new Date(staff.joinDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-3 flex justify-between border-t border-gray-100">
                                    <button className="text-sm font-medium text-[#f97316] hover:underline">View Profile</button>
                                    <div className="flex space-x-3">
                                        <button className="text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                                        <button className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab: Assign Task */}
            {activeTab === 'tasks' && (
                <div className="space-y-6 animate-in fade-in duration-300">

                    {/* Action & Filter Bar */}
                    <div className="taskFilterControls bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

                            {/* Search & Filters */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search tasks..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] bg-white">
                                        <option>All Categories</option>
                                        <option>Logistics</option>
                                        <option>Catering</option>
                                        <option>Decoration</option>
                                    </select>
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] bg-white">
                                        <option>All Status</option>
                                        <option>In Progress</option>
                                        <option>Pending</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Primary Action */}
                            <button
                                onClick={() => setIsTaskModalOpen(true)}
                                className="assignTaskButton flex items-center px-4 py-2 bg-[#f97316] hover:bg-[#c2410c] text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200"
                            >
                                <Plus size={18} className="mr-2" />
                                Assign New Task
                            </button>
                        </div>
                    </div>

                    {/* Task Management Table */}
                    <div className="adminTaskTable bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#ffedd5]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Task ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Staff Info</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Task Details</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Timelines</th>

                                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-gray-500"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasks.map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {task.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{task.staffName}</div>
                                                <div className="text-xs text-gray-500">ID: {task.staffId}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 font-medium">{task.taskTitle}</div>
                                                <div className="text-xs text-gray-500 inline-flex items-center mt-1 bg-gray-100 px-2 py-0.5 rounded">
                                                    {task.category}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xs text-gray-500 flex flex-col gap-1">
                                                    <span>Assign: {task.assignedDate}</span>
                                                    <span className="text-[#f97316] font-medium">Due: {task.deadline}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                    ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Salary Payment */}
            {activeTab === 'salary' && (
                <SalaryProcessing />
            )}
            {/* Assign Task Modal */}
            <AssignTaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSave={() => {
                    setIsTaskModalOpen(false);
                    // Handle save logic here
                }}
            />
            {/* Add Staff Modal */}
            <AddStaffModal
                isOpen={isAddStaffModalOpen}
                onClose={() => setIsAddStaffModalOpen(false)}
                onSave={() => {
                    setIsAddStaffModalOpen(false);
                    // Handle save logic here
                }}
            />
        </div>
    );
};

export default StaffManagement;
