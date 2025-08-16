import { FaEdit, FaHome, FaTint, } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AdminSidebar from "./role/AdminSidebar";
import DonorSidebar from "./role/DonorSidebar";
import RecepientSidebar from "./role/RecepientSidebar";
import BothRole from "./role/BothRole";
import HospitalSidebar from "./role/HospitalSidebar";
import { RiLoginBoxLine } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { user, handleLogOut } = useAuth();
    return (
        <aside
            className={`fixed mt-2 inset-y-0 left-0 bg-white shadow-lg px-4 py-6 flex flex-col z-40
                           transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                           lg:translate-x-0 lg:flex lg:w-64 lg:rounded-r-lg
                           transition-transform duration-300 ease-in-out
                           pt-16 lg:pt-0
                           overflow-y-auto`}
        >
            <div className="flex items-center mb-8 -mt-14 lg:mt-6">
                <NavLink to='/dashboard/adminHome' className="bg-red-600 p-2 rounded-full mr-3">
                    <FaTint className="h-6 w-6 text-white" />
                </NavLink>
                <span className="text-2xl font-bold text-gray-800">BloodBank</span>
            </div>
            <nav className="space-y-2 flex-grow">
                {/* Admin Role */}
                <AdminSidebar setIsSidebarOpen={setIsSidebarOpen} />
                {/* Donor Role */}
                <DonorSidebar setIsSidebarOpen={setIsSidebarOpen} />
                {/* Recepient Role */}
                <RecepientSidebar setIsSidebarOpen={setIsSidebarOpen} />
                {/* User Role */}
                <BothRole setIsSidebarOpen={setIsSidebarOpen} />
                {/* Hospital Role */}
                <HospitalSidebar setIsSidebarOpen={setIsSidebarOpen} />
                {/* always show the this button */}
                <div className="my-4 divider">OR</div>
                <NavLink
                    to="/"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaHome className="h-5 w-5 mr-3" />
                    Go To Home
                </NavLink>
                {/* always show the on bottom */}
                <div className="flex flex-col gap-3 fixed bottom-5 w-full pr-10">
                    <NavLink
                        to="/dashboard/profile"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaEdit className="h-5 w-5 mr-3" />
                        Update Profile
                    </NavLink>
                    <NavLink
                        to="/"
                        onClick={() => {
                            setIsSidebarOpen(false);
                            handleLogOut();
                        }}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <RiLoginBoxLine className="h-5 w-5 mr-3" />
                        LogOut
                    </NavLink>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;