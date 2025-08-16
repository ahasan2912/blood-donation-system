import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../pages/dashboard/components/header/DashboardHeader";
import Sidebar from "../pages/dashboard/components/Sidebar";
import useRole from "../hooks/useRole";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [role] = useRole();
    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased flex">
            {/* DahsboadHeder */}
            <DashboardHeader
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen} />
            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                role={role} />

            {/* Overlay for mobile sidebar (to close when clicking outside) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 pt-12 lg:pt-0 flex flex-col min-h-screen overflow-y-auto">
                <div className="px-6 py-2 flex-grow">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;