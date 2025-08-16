import { NavLink } from "react-router-dom";
import useRole from "../../../../hooks/useRole";
import { FaBoxOpen, FaChartBar, FaClipboardList, FaHome, FaUsers } from "react-icons/fa";
const AdminSidebar = ({setIsSidebarOpen}) => {
    const [role] = useRole();
    return (
        <>
            {role === 'admin' ? <div className='space-y-2'>
                <NavLink
                    to="/dashboard/adminHome"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaHome className="h-5 w-5 mr-3" />
                    Admin Home
                </NavLink>
                <NavLink
                    to="/dashboard/manageUser"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaUsers className="h-5 w-5 mr-3" />
                    Manage Users
                </NavLink>
                <NavLink
                    to="/dashboard/manageDonar"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaBoxOpen className="h-5 w-5 mr-3" />
                    Manage Donors
                </NavLink>
                <NavLink
                    to="/dashboard/manageHospital"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaBoxOpen className="h-5 w-5 mr-3" />
                    Manage Hospital
                </NavLink>
                <NavLink
                    to="/dashboard/manageRecepient"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaClipboardList className="h-5 w-5 mr-3" />
                    Manage Recipient
                </NavLink> {/* Corrected typo: Recepient -> Recipient */}
            </div> : <></>}
        </>
    );
};

export default AdminSidebar;