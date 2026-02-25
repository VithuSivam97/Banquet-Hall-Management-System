import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    PartyPopper,
    Users,
    Store,
    Package,
    Box,
    FileText,
    Bell,
    MessageSquare,
    Settings,
    X,
    UserCheck,
    LogOut
} from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/overview' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
    { icon: PartyPopper, label: 'Events', path: '/admin/events' },
    { icon: Users, label: 'Staff', path: '/admin/staff' },
    { icon: Store, label: 'Vendors', path: '/admin/vendors' },
    { icon: Package, label: 'Packages', path: '/admin/packages' },
    { icon: Box, label: 'Inventory', path: '/admin/inventory' },
    { icon: UserCheck, label: 'Users', path: '/admin/users' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: MessageSquare, label: 'Feedback', path: '/admin/feedback' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const Sidebar = () => {
    const { isOpen, close, isMobile } = useSidebar();
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin', email: 'admin@example.com' };

    const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-stone-800 text-white transform transition-transform duration-200 ease-in-out flex flex-col
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:relative lg:translate-x-0
  `;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-stone-900 bg-opacity-50 z-40 lg:hidden"
                    onClick={close}
                />
            )}

            <aside className={sidebarClasses}>
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => isMobile && close()}
                        >
                            {({ isActive }) => (
                                <div className={`
                                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                    ${isActive
                                        ? 'bg-stone-700 text-orange-200 shadow-sm'
                                        : 'text-stone-400 hover:text-white hover:bg-stone-700/50'
                                    }
                                `}>
                                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-orange-400' : ''}`} />
                                    {item.label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto p-4 border-t border-stone-700 shrink-0">
                    <div className="flex items-center gap-3 p-3 bg-stone-700/30 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-stone-800 font-bold border-2 border-stone-700 shadow-inner">
                            {user.name?.[0] || 'A'}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold truncate text-white">{user.name || 'Admin'}</span>
                            <span className="text-xs text-stone-400 truncate">{user.email || 'admin@example.com'}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
