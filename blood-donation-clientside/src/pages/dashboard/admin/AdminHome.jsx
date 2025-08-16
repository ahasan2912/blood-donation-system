import { FaCheckCircle, FaExclamationTriangle, FaHandHoldingHeart, FaHistory, FaTint, FaUsers } from 'react-icons/fa';
import useUserList from "../../../hooks/useUserList";
import HeaderContent from "../components/header/HeaderContent";
import useDonorList from '../../../hooks/useDonorList';
import useRecipientList from '../../../hooks/useRecipientList';
import useHospital from '../../../hooks/useHospital';

const AdminHome = () => {
    const [users] = useUserList();
    const [donors] = useDonorList();
    const [recipients] = useRecipientList();
    const [hospitals] = useHospital();

    const aPositive = donors?.reduce((count, donor) => {
        return donor.bloodType === "A+" ? count + 1 : count;
    }, 0);
    const aNegative = donors?.reduce((count, donor) => {
        return donor.bloodType === "A-" ? count + 1 : count;
    }, 0);
    const bPositive = donors?.reduce((count, donor) => {
        return donor.bloodType === "B+" ? count + 1 : count;
    }, 0);
    const bNegative = donors?.reduce((count, donor) => {
        return donor.bloodType === "B-" ? count + 1 : count;
    }, 0);
    const abPositive = donors?.reduce((count, donor) => {
        return donor.bloodType === "AB+" ? count + 1 : count;
    }, 0);
    const abNegative = donors?.reduce((count, donor) => {
        return donor.bloodType === "AB-" ? count + 1 : count;
    }, 0);
    const oPositive = donors?.reduce((count, donor) => {
        return donor.bloodType === "O+" ? count + 1 : count;
    }, 0);
    const oNegative = donors?.reduce((count, donor) => {
        return donor.bloodType === "O-" ? count + 1 : count;
    }, 0);

    const mockStats = {
        totalUser: { value: users?.length, icon: FaUsers, color: 'text-blue-600', bg: 'from-blue-50 to-blue-100', border: 'border-blue-100' },
        totalDonors: { value: donors?.length, icon: FaTint, color: 'text-green-500', bg: 'from-green-100 to-green-200', border: 'border-green-100' },
        totalRecipient: {
            value: recipients?.length, icon: FaHandHoldingHeart,
            color: 'text-purple-600', bg: 'from-purple-50 to-purple-300', border: 'border-purple-100'
        },
        TotalHospital: { value: hospitals?.length, icon: FaExclamationTriangle, color: 'text-red-600', bg: 'from-red-50 to-red-100', border: 'border-red-100' },
    };

    const mockBloodInventory = [
        { type: 'A+', units: aPositive, criticalThreshold: aPositive },
        { type: 'A-', units: aNegative, criticalThreshold: aNegative },
        { type: 'B+', units: bPositive, criticalThreshold: bPositive },
        { type: 'B-', units: bNegative, criticalThreshold: bNegative },
        { type: 'AB+', units: abPositive, criticalThreshold: abPositive },
        { type: 'AB-', units: abNegative, criticalThreshold: abNegative },
        { type: 'O+', units: oPositive, criticalThreshold: oPositive },
        { type: 'O-', units: oNegative, criticalThreshold: oNegative },
    ];

    const mockRecentActivity = [
        { id: 1, text: 'New donor registered: John Smith', time: '15 minutes ago', type: 'user' },
        { id: 2, text: '2 units of A+ received from Maria Johnson', time: '1 hour ago', type: 'donation' },
        { id: 3, text: 'Central Hospital requested 5 units of O-', time: '3 hours ago', type: 'request' },
        { id: 4, text: 'Request for St. Mary Medical Center fulfilled', time: '9 hours ago', type: 'fulfillment' },
        { id: 5, text: '1 units of B- received from Robert Chen', time: '8 hours ago', type: 'donation' },
        { id: 6, text: 'New donor registered: Jane Doe', time: '1 day ago', type: 'user' },
        { id: 7, text: 'Request for City Hospital fulfilled', time: '2 days ago', type: 'fulfillment' },
    ];

    // Helper function to get icon and color for recent activity
    const getActivityIconAndColor = (type) => {
        switch (type) {
            case 'user': return { icon: <FaUsers />, color: 'bg-blue-100 text-blue-700' };
            case 'donation': return { icon: <FaTint />, color: 'bg-green-100 text-green-700' };
            case 'request': return { icon: <FaHandHoldingHeart />, color: 'bg-red-100 text-red-700' };
            case 'fulfillment': return { icon: <FaCheckCircle />, color: 'bg-purple-100 text-purple-700' };
            default: return { icon: <FaHistory />, color: 'bg-gray-100 text-gray-700' };
        }
    };

    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Header */}
            <HeaderContent
                redText={`Admin`}
                blackText={`Dashboard Overview`} />
            {/* Overview Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {Object.keys(mockStats).map((key) => {
                    const stat = mockStats[key];
                    const Icon = stat.icon; // Component for react-icons
                    const isPositiveChange = stat.change && stat.change.includes('+') || stat.change?.includes('↑');
                    const changeColor = isPositiveChange ? 'text-green-600' : 'text-red-600';

                    return (
                        <div key={key} className={`bg-gradient-to-br ${stat.bg} p-6 rounded-xl shadow-md border ${stat.border} flex items-center space-x-4 transform hover:scale-105 transition-all duration-300 ease-in-out`}>
                            <div className={`p-3 ${stat.color.replace('text-', 'bg-')} rounded-full shadow-lg`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p> {/* Formats camelCase to readable */}
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                <p className={`text-sm ${changeColor}`}>{stat.change || stat.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Blood Inventory Status & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Blood Inventory Status */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">
                        Blood Inventory Status
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {mockBloodInventory.map((item, index) => (
                            <div key={index} className={`p-5 rounded-xl shadow-sm border
                                ${item.units <= item.criticalThreshold ? 'bg-red-50 border-red-200' : item.status === 'Low' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}
                                flex flex-col transform hover:scale-105 transition-all duration-300 ease-in-out`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-bold text-gray-900">{item.type}</span>
                                    {item.units < 10 ? (
                                        <FaExclamationTriangle className="h-6 w-6 text-red-500" title="Critical Level" />
                                    ) : (
                                        <FaCheckCircle className="h-6 w-6 text-green-500" title="Healthy Level" />
                                    )}
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                    <div
                                        className={`h-2.5 rounded-full ${item.units < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                                        style={{ width: `${Math.min(100, item.units * 1)}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600">Available: <span className="font-semibold">{item.units} Units</span></p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-100">
                        Recent Activity
                    </h3>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {mockRecentActivity.map((activity) => {
                            const { icon, color } = getActivityIconAndColor(activity.type);
                            return (
                                <div key={activity.id} className="flex items-start bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100 transition-colors duration-200 hover:bg-gray-100">
                                    <div className={`p-2 rounded-full ${color} mr-3 flex-shrink-0`}>
                                        {icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-700 text-base font-medium">{activity.text}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="mt-6 w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200 shadow-lg">
                        View All Activities
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;