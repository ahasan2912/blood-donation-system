import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const HospitalDonationReq = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: hospitalBlood = [], isLoading, refetch } = useQuery({
        queryKey: ['hospitalBlood', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/hospital-blood?email=${user.email}`);
            return res.data;
        },
    });
    
    const handleAccept = async (id) => {
        try {
            const res = await axiosPublic.patch(`/hospital-blood-status/${id}`, {
                status: 'Accepted',
            });

            if (res.data.modifiedCount > 0) {

                Swal.fire('Accepted!', 'The request has been accepted.', 'success');
                refetch();
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };
    const handleReject = async (id) => {
        try {
            const result = await axiosPublic.patch(`/hospital-blood-reject/${id}`, {
                status: 'Rejected',
            })
            console.log(result)
            if (result.data.modifiedCount > 0) {
                Swal.fire('Rejected!', 'The request has been rejected.', 'success');
                refetch();
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    if (isLoading) return <p className="text-center text-lg font-medium text-blue-600">Loading...</p>;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-red-700">Blood Donation Requests</h2>

            {hospitalBlood.length === 0 ? (
                <p className="text-center text-gray-500">No requests found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>

                                <th className="px-4 py-3 text-left">Contact</th>
                                <th className="px-4 py-3 text-left">Address</th>
                                <th className="px-4 py-3 text-left">Hospital</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Requested At</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {hospitalBlood.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-600">{index + 1}</td>


                                    <td className="px-4 py-3">{item.recipientInfo?.contactNumber}</td>
                                    <td className="px-4 py-3">
                                        {item.recipientInfo?.subDistrict}, {item.recipientInfo?.district}, {item.recipientInfo?.division}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-semibold">{item.recipientInfo?.name}</p>
                                            <p className="text-xs text-gray-500">{item.recipientInfo?.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${item.requestStatus === 'pending'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'bg-green-100 text-green-600'
                                                }`}
                                        >
                                            {item.requestStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-xs flex items-center gap-1">
                                        <FaClock /> {new Date(item.requestedAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button onClick={() => handleAccept(item._id)} disabled={item.requestStatus !== 'pending'} className='text-red-600 hover:text-red-900 btn'>
                                            Accpet
                                        </button>
                                        <button disabled={item.requestStatus !== 'Rejected'} onClick={() => handleReject(item._id)} className="text-red-600 hover:text-red-900 btn">Reject</button>
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

export default HospitalDonationReq;