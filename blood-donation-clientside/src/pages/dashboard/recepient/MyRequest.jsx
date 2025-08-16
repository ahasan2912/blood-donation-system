import { useQuery} from '@tanstack/react-query';
import { FaHistory, FaTint } from 'react-icons/fa';
import HeaderContent from '../components/header/HeaderContent';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';

const MyRequest = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['requestHistory', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/booked-donors/history/${user.email}`);
      return res.data;
    },
  });

  const requestHistory = data.requestHistory || [];

  if (isLoading) {
    return <BloodLoadingSpinner />
  }

  return (
    <div className="p-6 bg-white min-h-screen rounded-lg shadow-lg">
      {/* Header */}
      <HeaderContent
        redText={`Donation`}
        blackText={`Request`} />

      {requestHistory?.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md mt-10">
          <FaHistory className="text-red-400 text-6xl mb-4" />
          <p className="text-2xl text-gray-600 font-semibold">You haven't made any donations yet.</p>
          <p className="text-md text-gray-500 mt-2">Start by responding to a blood request!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  Recipient Name
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  Recipient Email
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  Upazila
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  District
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  Division
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                  Booked At
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              { requestHistory?.map((req, index) => (
                <tr key={req._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    D00{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req?.donorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{req.donorEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                      {req.donorBloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{req.donorContact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-red-700">
                    <div className="text-sm text-gray-500">{req.donorUpazila}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-red-700">
                    <div className="text-sm text-gray-500">{req.donorDistrict}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-red-700">
                    <div className="text-sm text-gray-500">{req.donorDivision}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(req.confirmedAt).toLocaleDateString('en-GB')}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{req.status}</span>
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

export default MyRequest;
