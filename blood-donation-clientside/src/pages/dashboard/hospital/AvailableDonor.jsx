import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useDonorList from '../../../hooks/useDonorList';
import toast from 'react-hot-toast';
import HeaderContent from '../components/header/HeaderContent';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';

const MangeAllDonor = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [donors] = useDonorList();
    const queryClient = useQueryClient();

    // 1. Fetch current hospital user info based on logged-in email
    const { data: hospitalUsers, refetch: refetchRequests, isLoading } = useQuery({
        queryKey: ['currentHospitalUser', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/hospital/${user?.email}`);
            return res.data;
        },
    });

    const currentUser = hospitalUsers && hospitalUsers.length > 0 ? hospitalUsers[0] : null;

    // 4. Handle sending request
    const handleSendRequest = async (donor) => {
        const bookingData = {
            donorId: donor._id,
            donorName: donor.name,
            donorEmail: donor.email,
            donorBloodType: donor.bloodType,
            donorDivision: donor.division,
            donorDistrict: donor.district,
            donorUpazila: donor.subDistrict,
            donorContact: donor.contactNumber,
            /* Recipient Information */
            recipientName: currentUser.HospitalName || currentUser?.name,
            recipientEmail: currentUser.email,
            recipientBloodType: donor.bloodType,
            recipientPhoto: currentUser.photo,
            recipientContact: currentUser.contactNumber,
            recipientUpazila: currentUser.subDistrict,
            recipientDistrict: currentUser.district,
            recipientDivision: currentUser.division,
            requestedAt: new Date().toISOString(),
            status: 'Pending'
        };
        try {
            const res = await axiosPublic.post('/booked-donors', bookingData);

            if (res.data?.insertedId) {
                toast.success('Donor booked successfully!');
                await axiosPublic.patch(`/donors/update-status/${donor?.email}`, {
                    status: 'Processing',
                });
                queryClient.invalidateQueries(['availableDonors']);
            } else {
                toast.error('Failed to book donor.');
            }
            refetchRequests();
        } catch (error) {
            console.error(error);
            toast.success(`Error', 'Failed to send request', ${error}`);
        }
    };

    // 5. Filter donors based on search and eligibility
    const filteredUsers = donors?.filter((donor) => {
        const lastDonationDate = new Date(donor.lastDonation);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const isEligible = lastDonationDate <= threeMonthsAgo;

        return isEligible;
    });

    if (isLoading && !user) {
        return <BloodLoadingSpinner />
    }

    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Header */}
            <HeaderContent
                redText={`Available`}
                blackText={`Matching Donors`} />
            {/* Donors Table */}
            {
                isLoading ? <BloodLoadingSpinner /> :
                    <div className='overflow-x-auto rounded-lg shadow-md'>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-red-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Donor ID
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Donor Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Donor Email
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Blood Type
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        District
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Upazila
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Availability
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredUsers?.map((donor, index) => (
                                    <tr key={donor?._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 group-hover:text-red-800">
                                            D00{index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-600 group-hover:text-red-800">{donor.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-base text-gray-700 group-hover:text-red-700">{donor?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                                                {donor.bloodType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-base text-gray-700 group-hover:text-red-700">{donor.district}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{donor.subDistrict}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{donor?.contactNumber}</div>
                                        </td>
                                        <td className='py-3 px-4 text-sm pl-10' >
                                            {donor?.status === 'Pending' ? <span className='bg-yellow-100 px-2 py-1 rounded-full font-semibold text-yellow-800'>Pending</span> : <span className='bg-green-300 text-green-900 px-2 py-1 rounded-full font-semibold text-center'>{donor?.status}</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center">
                                            <button
                                                disabled={donor?.status === 'Processing'}
                                                onClick={() => handleSendRequest(donor)}
                                                className={`py-2 px-4 rounded-md text-sm font-semibold transition duration-300 ease-in-out
                                                ${donor?.status === 'Processing'
                                                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                                    }`}
                                            >
                                                {donor?.status === 'Processing' ? ' Booked' : 'Book Donor'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default MangeAllDonor;
