import { NavLink } from 'react-router-dom';
import useRole from '../../../../hooks/useRole';
import { FaHandHoldingHeart, FaHistory, FaHome, FaListAlt } from "react-icons/fa";

const HospitalSidebar = ({ setIsSidebarOpen }) => {
    const [role] = useRole();
    return (
        <>
            {role === 'hospital' ? (
                <div className='space-y-2'>
                    <NavLink
                        to="/dashboard/hospitalHome"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaHome className="h-5 w-5 mr-3" />
                        Hospital Home
                    </NavLink>
                    <NavLink
                        to="/dashboard/hospitalManageDonor"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaHome className="h-5 w-5 mr-3" />
                        Available Donors
                    </NavLink>
                    <NavLink
                        to="/dashboard/hospitalBookedDonor"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaHome className="h-5 w-5 mr-3" />
                       Booked All Donor
                    </NavLink>
                    <NavLink
                        to="/dashboard/hospitalRecipentHistory"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg font-semibold transition-colors duration-200
                ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-300'}`
                        }
                    >
                        <FaHome className="h-5 w-5 mr-3" />
                        Donation History
                    </NavLink>
                </div>
            ) : (<></>)}
        </>
    );
};

export default HospitalSidebar;