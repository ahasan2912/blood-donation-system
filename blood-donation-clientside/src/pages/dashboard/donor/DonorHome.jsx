import { FaTint, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPhoneAlt, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';

const DonorHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: mydonation = [] } = useQuery({
        queryKey: ['bookedDonors', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donors?email=${user?.email}`);
            return res.data;
        },
    });

    if (!mydonation || mydonation.length === 0) {
        return <BloodLoadingSpinner />;
    }

    const donor = mydonation[0];
    return (
        <div className=" bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={donor.photo}
                    alt={donor.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-red-500"
                />
                <div>
                    <h2 className="text-2xl font-bold">{donor.name}</h2>
                    <p className="text-gray-600 flex items-center gap-2"><FaUser /> {donor.gender}, Age: {donor.age}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                    <FaTint className="text-red-500" /> <span className="font-semibold">Blood Type:</span> {donor.bloodType}
                </div>
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500" /> <span className="font-semibold">Last Donation:</span> {donor.lastDonation}
                </div>
                <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-500" /> <span className="font-semibold">Status:</span> {donor.status}
                </div>
                <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-yellow-500" /> <span className="font-semibold">Contact:</span> {donor.contactNumber}
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-500" /> <span className="font-semibold">Location:</span> {donor.subDistrict}, {donor.district}, {donor.division}
                </div>
                <div className="flex items-center gap-2">
                    <FaCalendarCheck className="text-teal-600" /> <span className="font-semibold">Total Donations:</span> {donor.donationCount}
                </div>
            </div>
        </div>
    );
};

export default DonorHome;
