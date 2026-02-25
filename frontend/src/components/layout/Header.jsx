import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../hooks/useSidebar';

const Header = () => {
    const { toggle } = useSidebar();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-6 lg:px-10 shadow-sm relative z-30 shrink-0">
            <div className="flex items-center">
                <button
                    onClick={toggle}
                    className="p-2 -ml-2 mr-3 rounded-md lg:hidden text-stone-600 hover:bg-stone-50"
                >
                    <Menu size={24} />
                </button>
                <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Raajeshwary</span>
                    <span className="text-xs text-stone-400 font-medium tracking-wider uppercase">Admin Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <Link to="/" className="text-sm font-semibold text-stone-500 hover:text-orange-500 transition-colors hidden sm:block">View Site</Link>

                <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>

                <button className="p-2 text-stone-400 hover:text-orange-500 transition-colors relative">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-orange-600 border-2 border-orange-500/20 rounded-xl hover:bg-orange-50 transition-all duration-200"
                >
                    <LogOut size={18} />
                    <span className="hidden xs:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
