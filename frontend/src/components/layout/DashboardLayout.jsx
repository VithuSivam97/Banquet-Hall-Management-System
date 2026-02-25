import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from '../Navbar';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar showMyInfo={true} />

            <div className="flex flex-1 overflow-hidden pt-20">
                <Sidebar />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 lg:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
