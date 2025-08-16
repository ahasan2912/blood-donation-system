import { useQuery } from '@tanstack/react-query';
import { FaTint, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';
import { MdEmail } from 'react-icons/md';

const RecipientHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch recipient data for current user email
  const { data: recipientData, isError } = useQuery({
    queryKey: ['recipientData', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/recipient-requests?email=${user?.email}`);
      return res.data[0];
    }
  });

  if (isError || !recipientData) return <BloodLoadingSpinner />;

  console.log(recipientData)

  return (
    <div className=" bg-white shadow-lg rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-24 h-24 object-cover rounded-full border-4 border-red-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600 flex items-center gap-2"><FaUser /> {recipientData.gender}, Age: {recipientData.age}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center gap-2">
          <FaTint size={23} className="text-red-500" /> <span className="font-semibold">Blood Type:</span> {recipientData.bloodType}
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt size={23} className="text-green-500" /> <span className="font-semibold">Hospital Name:</span> {recipientData.hospital}
        </div>
        <div className="flex items-center gap-2">
          <MdEmail size={23} className="text-blue-500" /> <span className="font-semibold">
            Email:</span> {recipientData.email}
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt size={21} className="text-yellow-500" /> <span className="font-semibold">Contact:</span> {recipientData.contactPhone}
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt size={22} className="text-purple-500" /> <span className="font-semibold">Location:</span> {recipientData.upazila}, {recipientData.district}, {recipientData.division}
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarCheck size={22} className="text-teal-600" /> <span className="font-semibold"> Urgency:    </span> Normal
        </div>
      </div>
    </div>
  );
};

export default RecipientHome;
