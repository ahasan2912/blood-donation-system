import React, { use, useState } from 'react';
import SearchBox from '../components/header/SearchBox';
import { MdAddCall, MdDeleteForever } from 'react-icons/md';
import useUserList from '../../../hooks/useUserList';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { div } from 'framer-motion/client';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';

const UserManagementTable = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, isLoading, refetch] = useUserList();

    const handleDelete = async (userId) => {
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
                const res = await axiosPublic.delete(`/user/${userId}`);
                if (res?.data?.result?.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Failed!",
                    text: "Something went wrong while deleting the user.",
                    icon: "error"
                });
            }
        }

    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterAdmin = users?.filter(admin => admin.email !== user?.email);

    const filteredUsers = filterAdmin?.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-md border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Table Header & SearchBox Section */}
            <SearchBox
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                redText={`Admin`}
                blackText={`Dashboard All Users`}
                placeholder={`Search user by name or email...`} />

            {/* User Table */}
            {
                isLoading ? <BloodLoadingSpinner /> :
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-red-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Serial
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Photo
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredUsers?.map((user, index) => (
                                    <tr key={user?._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 group-hover:text-red-800">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex-shrink-0 h-12 w-12 relative">
                                                <img className="h-12 w-12 rounded-full object-cover border-2 border-red-100 shadow-sm transition-all duration-300 group-hover:border-red-300 group-hover:shadow-md" src={user?.image || user?.photo} alt={user?.name} referrerPolicy='no-referrer' />
                                                {/* Status dot for visual quick check */}
                                                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${user.status === 'Verified' ? 'bg-green-500' :
                                                    user.status === 'Pending' ? 'bg-yellow-500' :
                                                        'bg-green-500'
                                                    }`}>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-base font-semibold text-gray-900 group-hover:text-red-800">{user?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-red-700">
                                            {user?.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full capitalize shadow-sm transition-all duration-200 ${user?.role === 'admin'
                                                ? 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-600/20'
                                                : user?.role === 'donor'
                                                    ? 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-600/20'
                                                    : user?.role === 'recepient'
                                                        ? 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-600/20'
                                                        : user?.role === 'both'
                                                            ? 'bg-indigo-100 text-indigo-800 ring-1 ring-inset ring-indigo-600/20'
                                                            : 'bg-slate-100 text-slate-800 ring-1 ring-inset ring-slate-600/20'
                                                }`}>
                                                {user?.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                className="text-red-600 hover:text-red-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2 hover:bg-red-50 transform hover:scale-110"
                                                title="Remove Donor"
                                            >
                                                <MdAddCall size={25} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user?._id)}
                                                className="text-red-600 hover:text-red-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2 hover:bg-red-50 transform hover:scale-110"
                                                title="Remove User"
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

        </div>
    );
};

export default UserManagementTable;