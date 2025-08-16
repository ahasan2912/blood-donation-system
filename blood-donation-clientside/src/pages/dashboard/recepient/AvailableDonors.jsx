import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';
import HeaderContent from '../components/header/HeaderContent';

const AvailableDonors = () => {
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    
    // Fetch previously booked donors by the current user's email
    const { data: bookedDonors = [], refetch: refetchBookedDonors, isLoading: bookedDonorsLoading } = useQuery({
        queryKey: ['bookedDonors', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/booked-donors?userEmail=${user.email}`);
            return res.data;
        },
    });

    // Fetch current recipient info
    const { data: recipientInfo, isLoading: recipientLoading } = useQuery({
        queryKey: ['recipientInfo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/recipient-requests?email=${user.email}`);
            return res.data[0];
        },
    });

    // Fetch all donors
    const { data: allDonors = [], isLoading: donorLoading } = useQuery({
        queryKey: ['allDonors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donors');
            return res.data;
        },
    });

    if (recipientLoading || donorLoading || bookedDonorsLoading) {
        return <BloodLoadingSpinner />;
    }

    const matchedDonors = allDonors.filter((donor) => {
        // Check if lastDonation was more than 3 months ago
        const lastDonationDate = new Date(donor.lastDonation);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const isEligibleByDate = lastDonationDate <= threeMonthsAgo;

        return (
            donor.bloodType === recipientInfo?.bloodType &&
            donor.district === recipientInfo?.district && isEligibleByDate
        );
    });
    // Handle booking a donor
    const handleBookDonor = async (donor) => {
        try {
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
                recipientId: recipientInfo?._id,
                recipientName: recipientInfo?.name,
                recipientEmail: recipientInfo?.email,
                recipientContact: recipientInfo?.contactPhone,
                recipientBloodType: recipientInfo?.bloodType,
                recipientDivision: recipientInfo?.division,
                recipientDistrict: recipientInfo?.district,
                recipientUpazila: recipientInfo?.upazila,
                bookedAt: new Date(),
                status: 'Pending',
            };

            const res = await axiosPublic.post('/booked-donors', bookingData);
            if (res.data?.insertedId) {
                toast.success('Donor booked successfully!');
                await axiosPublic.patch(`/donors/update-status/${donor?.email}`, {
                    status: 'Processing',
                });
                queryClient.invalidateQueries(['availableDonors']);
                refetchBookedDonors();
            } else {
                toast.error('Failed to book donor.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong while booking.');
        }
    };

    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Header */}
            <HeaderContent
                redText={`Available`}
                blackText={`Matching Donors`} />
            {/* Donors Table */}
            {
                donorLoading ? <BloodLoadingSpinner /> :
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
                            {matchedDonors?.map((donor, index) => (
                                <tr key={donor?._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 group-hover:text-red-800">
                                        D00{index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-base font-semibold text-gray-900 group-hover:text-red-800">{donor.name}</div>
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
                                            onClick={() => handleBookDonor(donor)}
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
            }
        </div>
    );
};

export default AvailableDonors;