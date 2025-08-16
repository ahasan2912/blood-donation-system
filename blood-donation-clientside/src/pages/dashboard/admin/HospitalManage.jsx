import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import HeaderContent from '../components/header/HeaderContent';
import useUserList from '../../../hooks/useUserList';

const HospitalManage = () => {
    const axiosPublic = useAxiosPublic();
    const [users] = useUserList();

    const { data: hospitals = [], refetch } = useQuery({
        queryKey: ['hospitals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`all/hospital`);
            return res.data;
        }
    });

    const handleDelete = async (email) => {
        const result = await Swal.fire({
            title: "Confirm Acceptance?",
            text: `Are you sure you want to accept and change its role to Hospital?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept!"
        });

        if (result?.isConfirmed) {
            try {
                const res = await axiosPublic.delete(`/users/hospital/${email}`);
                const hospitalRes = await axiosPublic.delete(`/hospitals/${email}`);
                if (res.data.deletedCount > 0 || hospitalRes.data.deletedCount > 0) {
                    toast.success("Hospital user deleted successfully");
                    refetch();
                } else {
                    toast.error("No user found with that email");
                }
            } catch (error) {
                console.error('Delete error:', error);
                toast.error("Something went wrong while deleting");
            }
        }
    };

    const handleAccept = async (hospital) => {
        const result = await Swal.fire({
            title: "Confirm Acceptance?",
            text: `Are you sure you want to accept "${hospital.HospitalName}" and change its role to Hospital?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept!"
        });

        if (result?.isConfirmed) {
            try {
                const res = await axiosPublic.patch(`/hospital/update-role/${hospital._id}`, { role: 'hospital' });
                if (res.data.modifiedCount > 0) {
                    toast.success(`${hospital.HospitalName} is now approved as a hospital`);
                    refetch();
                } else {
                    toast.error("No changes made. It may already be approved.");
                }
            } catch (err) {
                console.error("Error accepting hospital:", err);
            }
        }
    };

    return (
        <div className="bg-white px-8 py-4 rounded-xl shadow-2xl border border-red-50 overflow-x-auto transform transition-all duration-500 hover:shadow-3xl hover:border-red-100 mt-10 lg:mt-0">
            {/* Header */}
            <HeaderContent
                redText={`Hospital`}
                blackText={`Management List`} />
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-red-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">Hospital Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">Manager Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">Manager Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">Upazila</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">District</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">Division</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">Contact / Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-red-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {hospitals?.map((hospital, index) => (
                            <tr key={hospital._id} className="group hover:bg-red-50/30 transition duration-300 ease-in-out">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 group-hover:text-red-800">
                                    H00{index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-500 group-hover:text-red-800">{hospital.HospitalName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 group-hover:text-red-700">{hospital.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 group-hover:text-red-700">{hospital.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 group-hover:text-red-600">  {hospital?.subDistrict}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 group-hover:text-red-600">{hospital?.district}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 group-hover:text-red-600">{hospital?.division}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 group-hover:text-red-600">{hospital.contactNumber}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center">
                                    <button

                                        onClick={() => handleAccept(hospital)}
                                        className="btn bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-200"
                                        title="Accept Hospital"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDelete(hospital.email)}
                                        className="btn bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200"
                                        title="Delete Hospital"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HospitalManage;
