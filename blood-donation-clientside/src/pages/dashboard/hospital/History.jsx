import { useQuery } from '@tanstack/react-query';
import { FaHistory, FaTint } from 'react-icons/fa';
import HeaderContent from '../components/header/HeaderContent';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';


const History = () => {
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
    <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
      {/* Header */}
      <HeaderContent
        redText={`Donation`}
        blackText={`History`} />

      {requestHistory?.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md mt-10">
          <FaHistory className="text-red-400 text-6xl mb-4" />
          <p className="text-2xl text-gray-600 font-semibold">You haven't made any donations yet.</p>
          <p className="text-md text-gray-500 mt-2">Start by responding to a blood request!</p>
        </div>
      ) : (
        <div className='overflow-x-auto rounded-lg shadow-md'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Recipient Id
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Recipient Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Recipient Email
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Blood Group
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Upazila
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  District
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Division
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Booked At
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {requestHistory?.map((req, index) => (
                <tr key={req?._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 group-hover:text-red-800">
                    R00{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-600 group-hover:text-red-800">{req?.donorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-700 group-hover:text-red-700">{req.donorEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                      {req.donorBloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-700 group-hover:text-red-700">{req.donorContact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 group-hover:text-red-600">{req.donorUpazila}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                    <div className="text-sm text-gray-500 group-hover:text-red-600">{req.donorDistrict}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                    <div className="text-sm text-gray-500 group-hover:text-red-600">{req.donorDivision}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                    {new Date(req.confirmedAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${req.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : req.status === 'Accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {req.status}
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

export default History;
