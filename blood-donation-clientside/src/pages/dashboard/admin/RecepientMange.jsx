import React, { useState } from 'react';
import SearchBox from '../components/header/SearchBox';
import useRecipientList from '../../../hooks/useRecipientList';
import { MdAddCall, MdDeleteForever, MdEmail } from 'react-icons/md';
import { FaEdit, FaTint } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';
const RecepientMange = () => {
    const axiosPublic = useAxiosPublic();
    const [recipients, isLoading, refetch] = useRecipientList();
    const [selectedRecipient, setSelectedRecipient] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = async (recipientId) => {
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
                const res = await axiosPublic.delete(`/recipient/${recipientId}`);

                if (res?.data?.result?.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Recipient has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Failed!",
                    text: "Something went wrong while deleting the Recipient.",
                    icon: "error"
                });
            }
        }
    };

    const handleContactInfo = async (recipient) => {
        setSelectedRecipient(recipient);
        document.getElementById('my_modal_1').showModal();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = recipients?.filter((recipient) =>
        recipient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.bloodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.upazila.toLowerCase().includes(searchTerm.toLowerCase()) || recipient.district.toLowerCase().includes(searchTerm.toLowerCase()) || recipient.division.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Table Header & SearchBox Section */}
            <SearchBox
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                redText={`Recipient`}
                blackText={`Management List`}
                placeholder={`Search users by name or email...`} />

            {/* recipients Table */}
            {
                isLoading ? <BloodLoadingSpinner /> :
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-red-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Name
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
                                        Contact / Email
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Blood Group
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Medical
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        UnitsNeeded
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredUsers?.map((recipient, index) => (
                                    <tr key={recipient._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 group-hover:text-red-800">
                                            R00{index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-500 group-hover:text-red-800">{recipient.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 group-hover:text-red-700">{recipient?.upazila}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{recipient?.district}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 group-hover:text-red-600">{recipient?.division}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-700 group-hover:text-red-700">{recipient.email}</div>
                                            <div className="text-xs text-gray-500 group-hover:text-red-600">{recipient.contactPhone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 shadow-sm">
                                                {recipient.bloodType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-red-600">
                                            {recipient.hospital}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold group-hover:text-red-800">
                                            {recipient.unitsNeeded}
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center">
                                            <button
                                                onClick={() => handleContactInfo(recipient)}
                                                className="text-red-600 hover:text-red-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2 hover:bg-red-50 transform hover:scale-110"
                                                title="Remove recipient"
                                            >
                                                <MdAddCall size={25} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(recipient._id)}
                                                className="text-red-600 hover:text-red-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2 hover:bg-red-50 transform hover:scale-110"
                                                title="Remove recipient"
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
                selectedRecipient && (
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box bg-red-50 border-l-8 border-red-500 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-100 p-2 rounded-full text-red-600">
                                    <FaTint size={23} />
                                </div>
                                <h3 className="text-2xl font-bold text-red-600">{selectedRecipient.name} <span className='text-black'>Contact Information</span></h3>
                            </div>
                            <div className='flex items-center gap-3 flex-wrap'>
                                <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                    <FaLocationDot size={20} />
                                </div>
                                <span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedRecipient.upazila}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedRecipient.district}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedRecipient.division}</span>
                            </div>
                            <div className='my-5'>
                                <div className='flex items-center gap-3'>
                                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                        <MdAddCall size={23} />
                                    </div>
                                    <h3 className="text-xl font-bold text-red-600">Contact<span className='text-black'> Number: <span className='bg-green-300 px-2 rounded-sm'>{selectedRecipient.contactPhone}</span></span></h3>
                                </div>
                                <div className='flex items-center gap-3 mt-4'>
                                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                                        <MdEmail size={23} />
                                    </div>
                                    <h3 className="text-xl font-bold text-red-600">Eamil<span className='text-black'> Address: <span className='bg-green-300 px-2 rounded-sm'>{selectedRecipient.email}</span></span></h3>
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

export default RecepientMange;