import { NavLink } from "react-router-dom";
import useRole from "../../../../hooks/useRole";
import {
    FaHome,
    FaUsers,
    FaHandHoldingHeart,
    FaHistory,
    FaBoxOpen,
} from "react-icons/fa";

const BothRole = ({ setIsSidebarOpen }) => {
    const [role, isLoading] = useRole();
    if (isLoading) {
        return <div className="flex justify-center h-full">
            <div
                className="w-10 h-10 border-4 border-red-500 rounded-full animate-spin"
                aria-label="Loading"
            ></div>
        </div>
    }

    return (
        <>
            {role === 'both' ? (
                <div className='space-y-2'>
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
                        to="/dashboard/donorHome"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaHome className="h-5 w-5 mr-3" />
                        Donor Home
                    </NavLink>
                    <NavLink
                        to="/dashboard/donationRequestsList"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaHandHoldingHeart className="h-5 w-5 mr-3" />
                        Donation Requests List
                    </NavLink>
                    <NavLink
                        to="/dashboard/donationHistory"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaHistory className="h-5 w-5 mr-3" />
                        My Donation History
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
                </div>
            ) : (<></>)}
        </>
    );
};

export default BothRole;