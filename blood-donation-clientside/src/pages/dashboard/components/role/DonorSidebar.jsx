import { NavLink } from 'react-router-dom';
import useRole from '../../../../hooks/useRole';
import { FaHandHoldingHeart, FaHistory, FaHome, FaListAlt } from "react-icons/fa";
const DonorSidebar = ({ setIsSidebarOpen }) => {
    const [role] = useRole();
    return (
        <>
            {role === 'donor' ? (
                <div className='space-y-2'>
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
                </div>
            ) : (<></>)}
        </>
    );
};

export default DonorSidebar;