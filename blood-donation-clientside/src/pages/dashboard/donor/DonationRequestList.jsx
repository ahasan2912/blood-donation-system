import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaHistory } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import HeaderContent from '../components/header/HeaderContent';

const DonationRequestList = () => {
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  //Booed donor data
  const { data: bookedDonors = [] } = useQuery({
    queryKey: ['bookedDonors', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/booked-donors?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // handle Accept
  const handleAccept = async (donorEmail, bookingId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `You are accepting this donation.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept',
    });
    if (!confirm.isConfirmed) return;

    const acceptedBooking = bookedDonors.find(req => req._id === bookingId);
    if (!acceptedBooking) throw new Error('Booking not found');

    const confirmedDonationData = {
      donorId: acceptedBooking.donorId,
      donorName: acceptedBooking.donorName,
      donorEmail: acceptedBooking.donorEmail,
      donorBloodType: acceptedBooking.donorBloodType,
      donorDivision: acceptedBooking.donorDivision,
      donorDistrict: acceptedBooking.donorDistrict,
      donorUpazila: acceptedBooking.donorUpazila,
      donorContact: acceptedBooking.donorContact,
      // recipient
      recipientId: acceptedBooking.recipientId,
      recipientName: acceptedBooking.recipientName,
      recipientEmail: acceptedBooking.recipientEmail,
      recipientBloodType: acceptedBooking.recipientBloodType,
      recipientDivision: acceptedBooking.recipientDivision,
      recipientDistrict: acceptedBooking.recipientDistrict,
      recipientUpazila: acceptedBooking.recipientUpazila,
      recipientContact: acceptedBooking.recipientContact,
      requestMessage: acceptedBooking.requestMessage,
      confirmedAt: new Date(),
      status: "Accepted",
    };

    try {
      await axiosPublic.post('/booked-donors/confirm', confirmedDonationData);
      await axiosPublic.post('/booked-donors/history', confirmedDonationData);

      const res = await axiosPublic.patch(`/donors/update-last-donation/${donorEmail}`);

      if (res.data.message) {
        await axiosPublic.patch(`/booked-donors/update-status/${bookingId}`, {
          status: 'Accepted',
        });
        toast.success('Last donation date & booking status updated!');
        queryClient.invalidateQueries(['bookedDonors', user.email]);
      }
    } catch (err) {
      toast.error('Failed to update donor!');
      console.error(err);
    }
  };

  // hanlde Reject
  const handleReject = async (donorEmail, rejectId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `You are accepting this donation.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept',
    });
    if (!confirm.isConfirmed) return;
    const acceptedBooking = bookedDonors.find(req => req._id === rejectId);
    if (!acceptedBooking) throw new Error('Booking not found');

    const confirmedDonationData = {
      donorId: acceptedBooking.donorId,
      donorName: acceptedBooking.donorName,
      donorEmail: acceptedBooking.donorEmail,
      donorBloodType: acceptedBooking.donorBloodType,
      donorDivision: acceptedBooking.donorDivision,
      donorDistrict: acceptedBooking.donorDistrict,
      donorUpazila: acceptedBooking.donorUpazila,
      donorContact: acceptedBooking.donorContact,
      // recipient
      recipientId: acceptedBooking.recipientId,
      recipientName: acceptedBooking.recipientName,
      recipientEmail: acceptedBooking.recipientEmail,
      recipientBloodType: acceptedBooking.recipientBloodType,
      recipientDivision: acceptedBooking.recipientDivision,
      recipientDistrict: acceptedBooking.recipientDistrict,
      recipientUpazila: acceptedBooking.recipientUpazila,
      recipientContact: acceptedBooking.recipientContact,
      requestMessage: acceptedBooking.requestMessage,
      confirmedAt: new Date(),
      status: "Rejected",
    };

    try {
      await axiosPublic.post('/booked-donors/history', confirmedDonationData);
      // bookedDonors delete
      await axiosPublic.patch(`/donors/update-donor-status/${donorEmail}`);
      await axiosPublic.patch(`/booked-donors/update-status/${rejectId}`, {
        status: 'Rejected',
      });
      toast.success('Last donation date & booking status updated!');
      queryClient.invalidateQueries(['bookedDonors', user.email]);
    } catch (err) {
      toast.error('Failed to update donor!');
      console.error(err);
    }

  }

  return (
    <div className="p-6 bg-white min-h-screen rounded-lg shadow-lg">
      {/* Header */}
      <HeaderContent
        redText={`Your Incoming`}
        blackText={`Donation Requests`} />

      {bookedDonors.length === 0 ? (
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
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
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
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookedDonors.map((req, index) => (
                <tr key={req._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    R00{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-sm font-medium text-gray-900">{req.recipientName}</div>
                    <div className="text-sm text-gray-500">{req.recipientEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                      {req.recipientBloodType || req.donorBloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-red-700">
                    <div className="text-sm text-gray-500">{req.recipientUpazila}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-red-700">
                    <div className="text-sm text-gray-500">{req.recipientDistrict}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-red-700">
                    <div className="text-sm text-gray-500">{req.recipientDivision}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {req?.bookedAt?.slice(0, 10) || req?.requestedAt?.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
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
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleAccept(req.donorEmail, req._id)}
                      disabled={req.status === 'Accepted' || req.status === 'Rejected'}
                      className={`btn mr-2 ${req.status === 'Accepted' ? 'text-green-600' : 'bg-red-500 text-white'}`}
                    >
                      {
                        req?.status === 'Pending'
                          ? 'Accept'
                          : req?.status === 'Rejected'
                            ? 'Accept'
                            : 'Accepted'
                      }
                    </button>
                    <button
                      onClick={() => handleReject(req.donorEmail, req._id)}
                      disabled={req.status === 'Accepted' || req.status === 'Rejected'}
                      className={`btn mr-2 ${req.status === 'Accepted' ? 'text-green-600' : 'bg-red-500 text-white'}`}
                    >
                      {
                        req?.status === 'Pending'
                          ? 'Reject'
                          : req?.status === 'Rejected'
                            ? 'Rejected'
                            : 'Reject'
                      }
                    </button>
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

export default DonationRequestList;
