import { useState } from 'react';
import { FaTint } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdAddCall, MdDeleteForever, MdEmail } from 'react-icons/md';
import { isThreeMonthsPassed } from '../../../components/donor/utils';
import useDonorList from '../../../hooks/useDonorList';
import SearchBox from '../components/header/SearchBox';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';
const DonorsManage = () => {
    const axiosPublic = useAxiosPublic();
    const [donors, isLoading, refetch] = useDonorList();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDonor, setSelectedDonor] = useState({});

    const handleContactInfo = (donor) => {
        setSelectedDonor(donor);
        document.getElementById('my_modal').showModal();
    }

    const handleDelete = async (donorId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        if (result?.isConfirmed) {
            try {
                const res = await axiosPublic.delete(`/donor/${donorId}`);

                if (res?.data?.result?.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Donor has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Failed!",
                    text: "Something went wrong while deleting the donor.",
                    icon: "error"
                });
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = donors?.filter((donor) =>
        donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.bloodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.subDistrict.toLowerCase().includes(searchTerm.toLowerCase()) || donor.district.toLowerCase().includes(searchTerm.toLowerCase()) || donor.division.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Table Header & SearchBox Section */}
            <SearchBox
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                redText={`Donor`}
                blackText={`Management List`}
                placeholder={`Search users by name or email or location...`} />

            {/* Donors Table */}
            {
                isLoading ? <BloodLoadingSpinner /> :
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-red-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Donor ID
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Photo
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Blood Group
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Contact / Email
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Last Donation
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Total Donations
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Eligibility
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredUsers?.map((donor, index) => (
                                    <tr key={donor?._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 group-hover:text-red-800">
                                            D00{index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex-shrink-0 h-12 w-12 relative">
                                                <img className="h-12 w-12 rounded-full object-cover border-2 border-red-100 shadow-sm transition-all duration-300 group-hover:border-red-300 group-hover:shadow-md" src={donor?.photo} alt={donor.name} />
                                                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500`}></span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-base font-semibold text-gray-900 group-hover:text-red-800">{donor?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                                                {donor?.bloodType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-base text-gray-700 group-hover:text-red-700">{donor?.subDistrict}</div>
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{donor?.district}</div>
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{donor?.division}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-base text-gray-700 group-hover:text-red-700">{donor?.email}</div>
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{donor?.contactNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                                            {donor?.lastDonation}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold group-hover:text-red-800">
                                            {donor?.donationCount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full capitalize shadow-sm transition-all duration-200
                  ${isThreeMonthsPassed(donor?.lastDonation) ? 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20' :
                                                    'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
                                                }`}>
                                                {isThreeMonthsPassed(donor?.lastDonation) ? 'Eligible' : 'Not Eligible'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center">
                                            <button
                                                onClick={() => handleContactInfo(donor)}
                                                className="text-red-600 hover:text-red-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2 hover:bg-red-50 transform hover:scale-110"
                                                title="Remove Donor"
                                            >
                                                <MdAddCall size={25} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(donor._id)}
                                                className="text-red-600 hover:text-red-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2 hover:bg-red-50 transform hover:scale-110"
                                                title="Remove Donor"
                                            >
                                                <MdDeleteForever size={25} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

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
                                <h3 className="text-2xl font-bold text-red-600">{selectedDonor.name} <span className='text-black'>Contact Information</span></h3>
                            </div>
                            <div className='flex items-center gap-3 flex-wrap'>
                                <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                    <FaLocationDot size={20} />
                                </div>
                                <span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.subDistrict}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.district}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.division}</span>
                            </div>
                            <div className='my-5'>
                                <div className='flex items-center gap-3'>
                                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                        <MdAddCall size={23} />
                                    </div>
                                    <h3 className="text-xl font-bold text-red-600">Contact<span className='text-black'> Number: <span className='bg-green-300 px-2 rounded-sm'>{selectedDonor.contactNumber}</span></span></h3>
                                </div>
                                <div className='flex items-center gap-3 mt-4'>
                                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                        <MdEmail size={23} />
                                    </div>
                                    <h3 className="text-xl font-bold text-red-600">Eamil<span className='text-black'> Address: <span className='bg-green-300 px-2 rounded-sm'>{selectedDonor.email}</span></span></h3>
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

export default DonorsManage;