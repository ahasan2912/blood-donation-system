import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import HeaderContent from '../components/header/HeaderContent';
import { MdAddCall, MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { FaTint } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';


const AllBookedDonor = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [selectedDonor, setSelectedDonor] = useState({});

    // Fetch previously booked donors by the current user's email
    const { data: bookedDonors = [] } = useQuery({
        queryKey: ['bookedDonors123', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/booked-donors/confirmed/${user?.email}`);
            return res.data;
        },
    });

    const handleContactInfo = (donor) => {
        setSelectedDonor(donor);
        document.getElementById('my_modal').showModal();
    }
    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Header */}
            <HeaderContent
                redText={`All Booked`}
                blackText={`Donors`} />
            {/* Donors Table */}
            {
                bookedDonors.length > 0 ? (
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
                                        Upazila
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        District
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
                                {bookedDonors?.map((donor, index) => (
                                    <tr key={donor?._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 group-hover:text-red-800">
                                            D00{index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-600 group-hover:text-red-800">{donor.donorName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-600 group-hover:text-red-800">{donor.donorEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                                                {donor.donorBloodType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-700 group-hover:text-red-600">{donor.donorUpazila}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{donor.donorDistrict}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{donor.donorContact}</div>
                                        </td>
                                        <td className='py-3 px-4 text-sm pl-6' >
                                            {donor.status === 'Pending' ? <span className='bg-yellow-100 px-2 py-1 rounded-full font-semibold text-yellow-800'>Pending</span> : <span className='bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold'>Accepted</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center">
                                            <button onClick={() => handleContactInfo(donor)}
                                                className="text-red-600 hover:text-red-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2 hover:bg-red-50 transform hover:scale-110"
                                                title="Remove Donor"
                                            ><MdAddCall size={25} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='bg-red-500 py-10 rounded-md'>
                        <p className="text-center text-white text-3xl font-bold py-10">
                            No matching donors found in your district. Try checking your profile details.
                        </p>
                    </div>
                )
            }
            {/* ContactInformation Modal*/}
            {
                selectedDonor && (
                    <dialog id="my_modal" className="modal">
                        <div className="modal-box bg-red-50 border-l-8 border-red-500 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-100 p-2 rounded-full text-red-600">
                                    <FaTint size={23} />
                                </div>
                                <h3 className="text-2xl font-bold text-red-600">{selectedDonor.donorName} <span className='text-black'>Contact Information</span></h3>
                            </div>
                            <div className='flex items-center gap-3 flex-wrap'>
                                <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                    <FaLocationDot size={20} />
                                </div>
                                <span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.donorUpazila}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.donorDistrict}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.donorDivision}</span>
                            </div>
                            <div className='my-5'>
                                <div className='flex items-center gap-3'>
                                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                        <MdAddCall size={23} />
                                    </div>
                                    <h3 className="text-xl font-bold text-red-600">Contact<span className='text-black'> Number: <span className='bg-green-300 px-2 rounded-sm'>{selectedDonor.donorContact}</span></span></h3>
                                </div>
                                <div className='flex items-center gap-3 mt-4'>
                                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                        <MdEmail size={23} />
                                    </div>
                                    <h3 className="text-lg font-bold text-red-600">Eamil<span className='text-black'> Address: <span className='bg-green-300 px-2 rounded-sm'>{selectedDonor.donorEmail}</span></span></h3>
                                </div>
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn bg-red-500 hover:bg-red-600 text-white font-semibold">
                                        Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                )
            }
        </div>
    );
};

export default AllBookedDonor;