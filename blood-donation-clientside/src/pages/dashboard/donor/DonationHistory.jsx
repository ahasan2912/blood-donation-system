import { FaHistory, FaTint } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import HeaderContent from '../components/header/HeaderContent';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const DonationHistory = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: bookedDonors = [] } = useQuery({
        queryKey: ['bookedDonors', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/booked-donors?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { data: acceptedRequests = [] } = useQuery({
        queryKey: ['acceptedRequests', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get('/accepted-requests');
            return res.data.filter(request => request?.donorInfo?.email === user?.email);
        },
        enabled: !!user?.email,
    });

    const allDonations = [...bookedDonors, ...acceptedRequests];
    return (
        <div className="p-6 bg-white min-h-screen rounded-lg shadow-lg">
            {/* Header */}
            <HeaderContent
                redText={`Donation`}
                blackText={`History`} />

            {allDonations.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md mt-10">
                    <FaHistory className="text-red-400 text-6xl mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">You haven't made any donations yet.</p>
                    <p className="text-md text-gray-500 mt-2">Start by responding to a blood request!</p>
                    <button
                        onClick={() => alert('Navigate to Available Blood Requests page')} // Replace with actual navigation
                        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 shadow-md"
                    >
                        View Available Requests
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Recipient Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Recipient Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Blood Group
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Donation Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {allDonations.map((record, index) => (
                                <tr key={record._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        R00{index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.recipientName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.recipientEmail}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                                            {record.recipientBloodType || record?.donorBloodType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{record.
                                            recipientDistrict}</div>
                                        <div className="text-sm text-gray-500">{record.donorUpazila}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record?.bookedAt?.slice(0, 10) || record?.requestedAt?.slice(0, 10)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span
                                            className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${record.status === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : record.status === 'Accepted'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DonationHistory;
