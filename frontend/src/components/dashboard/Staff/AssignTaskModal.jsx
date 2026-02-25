import React from 'react';
import { X, Calendar } from 'lucide-react';

const AssignTaskModal = ({ isOpen, onClose, onSave }) => {
    const [dates, setDates] = React.useState({ assigned: '', deadline: '' });

    if (!isOpen) return null;

    const handleDateChange = (field, value) => {
        setDates(prev => ({ ...prev, [field]: value }));
    };

    const formatDateDisplay = (dateString) => {
        if (!dateString) return 'YYYY/MM/DD';
        return dateString.replace(/-/g, '/');
    };

    return (
        <div className="modalOverlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all scale-100">

                {/* 1. Modal Header */}
                <div className="modalHeaderContainer bg-[#f97316] px-6 py-4 flex items-center justify-between">
                    <h2 className="text-white text-lg font-bold">Assign New Task</h2>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* 2. Form Layout */}
                <div className="taskAssignmentForm p-6 space-y-6">

                    {/* Top Row: Category & Staff Member */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="inputFieldLabel block text-sm font-medium text-gray-700">Select Staff Category</label>
                            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent">
                                <option value="" disabled selected>Choose category...</option>
                                <option value="Logistics">Logistics</option>
                                <option value="Catering">Catering</option>
                                <option value="Decoration">Decoration</option>
                                <option value="Cleaning">Cleaning</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="inputFieldLabel block text-sm font-medium text-gray-700">Select Staff Member</label>
                            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent">
                                <option value="" disabled selected>Choose staff...</option>
                                <option value="S012">Arun Kumar</option>
                                <option value="S015">Ramesh Chandran</option>
                                <option value="S008">Sancika S.</option>
                            </select>
                        </div>
                    </div>

                    {/* Middle Rows: Title & Description */}
                    <div className="space-y-1">
                        <label className="inputFieldLabel block text-sm font-medium text-gray-700">Task Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Setup Main Stage"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="inputFieldLabel block text-sm font-medium text-gray-700">Task Description</label>
                        <textarea
                            rows="3"
                            placeholder="Enter detailed instructions for the task..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent resize-none"
                        ></textarea>
                    </div>

                    {/* Date Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Assigned Date */}
                        <div className="space-y-1">
                            <label className="inputFieldLabel block text-sm font-medium text-gray-700">Assigned Date</label>
                            <div
                                className="relative group focus-within:ring-2 focus-within:ring-[#f97316] rounded-lg cursor-pointer"
                                onClick={() => document.getElementById('assignedDateInput').showPicker()}
                            >
                                {/* Facade Display */}
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white flex items-center justify-between text-gray-700 pointer-events-none">
                                    <span className={!dates.assigned ? 'text-gray-400' : ''}>
                                        {formatDateDisplay(dates.assigned)}
                                    </span>
                                    <Calendar size={18} className="text-gray-400" />
                                </div>
                                {/* Actual Hidden Input */}
                                <input
                                    id="assignedDateInput"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => handleDateChange('assigned', e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-sm"
                                    tabIndex={-1}
                                />
                            </div>
                        </div>

                        {/* Deadline */}
                        <div className="space-y-1">
                            <label className="inputFieldLabel block text-sm font-medium text-gray-700">Deadline</label>
                            <div
                                className="relative group focus-within:ring-2 focus-within:ring-[#f97316] rounded-lg cursor-pointer"
                                onClick={() => document.getElementById('deadlineInput').showPicker()}
                            >
                                {/* Facade Display */}
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white flex items-center justify-between text-gray-700 pointer-events-none">
                                    <span className={!dates.deadline ? 'text-gray-400' : ''}>
                                        {formatDateDisplay(dates.deadline)}
                                    </span>
                                    <Calendar size={18} className="text-gray-400" />
                                </div>
                                {/* Actual Hidden Input */}
                                <input
                                    id="deadlineInput"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => handleDateChange('deadline', e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-sm"
                                    tabIndex={-1}
                                />
                            </div>
                        </div>
                    </div>


                </div>

                {/* 3. Action Buttons */}
                <div className="formActionGroup px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="cancelBtn px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="assignTaskBtn px-6 py-2 bg-[#f97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 transition-colors shadow-sm"
                    >
                        Assign Task
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AssignTaskModal;
