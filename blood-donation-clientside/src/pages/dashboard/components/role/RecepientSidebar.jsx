import { NavLink } from "react-router-dom";
import useRole from "../../../../hooks/useRole";
import { FaBoxOpen, FaHome, FaUsers } from "react-icons/fa";
const RecepientSidebar = ({ setIsSidebarOpen }) => {
    const [role] = useRole();
    return (
        <>
            {role === 'recepient' ? <div className='space-y-2'>
                <NavLink
                    to="/dashboard/recepientHome"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaHome className="h-5 w-5 mr-3" />
                    Recipient Home
                </NavLink>
                <NavLink
                    to="/dashboard/my-requests"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaUsers className="h-5 w-5 mr-3" />
                    My Requests
                </NavLink>
                <NavLink
                    to="/dashboard/available-donors"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaBoxOpen className="h-5 w-5 mr-3" />
                    Available Donors
                </NavLink>
                 <NavLink
                    to="/dashboard/allBookedDonor"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                             ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                    }
                >
                    <FaBoxOpen className="h-5 w-5 mr-3" />
                    Booked Donor
                </NavLink>
            </div> : <></>}
        </>
    );
};

export default RecepientSidebar;