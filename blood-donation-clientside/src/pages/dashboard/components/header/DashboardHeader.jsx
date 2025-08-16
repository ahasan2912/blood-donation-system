import { FaBars, FaTimes, FaTint } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardHeader = ({isSidebarOpen, setIsSidebarOpen}) => {
    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center z-30">
            <div className="flex items-center">
                <NavLink to='/dashboard/adminHome' className="bg-red-600 p-2 rounded-full mr-3">
                    <FaTint className="h-6 w-6 text-white" />
                </NavLink>
                <span className="text-2xl font-bold text-gray-1800">BloodBank</span>
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-700 focus:outline-none">
                {/* Toggle Icon */}
                {isSidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
        </div>
    );
};

export default DashboardHeader;