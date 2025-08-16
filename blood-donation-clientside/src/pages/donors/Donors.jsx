import { useState } from 'react'
import { motion } from 'framer-motion'
import DonorCard from '../../components/donor/DonorCard';
import FilterBox from '../../components/donor/FilterBox';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SearchBox from './SearchBox';
import { isThreeMonthsPassed } from '../../components/donor/utils';

const Donors = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDonor, setSelectedDonor] = useState({});
    const [filters, setFilters] = useState({
        bloodTypes: [],
        subDistrict: '',
        district: '',
        division: '',
        onlyAvailable: false
    })
    // fetch from database
    const { data: donors = [], isLoading, refetch } = useQuery({
        queryKey: ['donors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donors');
            return res?.data;
        }
    });

    const filteredDonors = donors.filter(donor => {
        // Apply search term filter
        const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.subDistrict.toLowerCase().includes(searchTerm.toLowerCase()) || donor.district.toLowerCase().includes(searchTerm.toLowerCase()) || donor.division.toLowerCase().includes(searchTerm.toLowerCase());

        // Apply blood type filter
        const matchesBloodType = filters.bloodTypes.length === 0 ||
            filters.bloodTypes.includes(donor.bloodType)

        // Apply city filter
        const matchesCity =
            !filters.subDistrict || donor.subDistrict.toLowerCase().includes(filters.subDistrict.toLowerCase()) ||
            !filters.district || donor.district.toLowerCase().includes(filters.district.toLowerCase()) ||
            !filters.division || donor.division.toLowerCase().includes(filters.division.toLowerCase());

        const isAvailable = isThreeMonthsPassed(donor.lastDonation)

        // Apply availability filter
        const matchesAvailability = !filters.onlyAvailable || isAvailable

        return matchesSearch && matchesBloodType && matchesCity && matchesAvailability
    })

    return (
        <div className="my-20 -z-50">
            {/* Searchbox */}
            <SearchBox
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                refetch={refetch} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container mx-auto mt-20 px-3">
                <div className="lg:col-span-1">
                    <FilterBox filters={filters} setFilters={setFilters} />
                    <motion.div
                        className="bg-white rounded-lg p-4 md:p-6 border border-red-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-red-700 mb-2">Want to Be a Donor?</h3>
                        <p className="text-red-800 mb-4 text-sm">
                            If you're willing to donate blood and help save lives, click the button below to register as a donor.
                        </p>
                        <Link to="/blood-donate-registration" className="btn bg-red-500 hover:bg-red-600 text-white rounded-md py-[20px] w-full">Become a Donor</Link>
                    </motion.div>
                    <motion.div
                        className="bg-gray-50 rounded-lg p-4 md:p-6 mt-5 border border-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-[#1B5E20] mb-2">Need Blood Urgently?</h3>
                        <p className="text-gray-700 mb-4 text-sm">
                            If you need blood urgently, submit a formal request through our system to reach all eligible donors.
                        </p>
                        <Link to="/blood-request-from" className="btn bg-[#2E7D32] hover:bg-gray-700 text-white rounded-md py-[20px] w-full">Request Blood</Link>
                    </motion.div>
                </div>
                <div className="lg:col-span-3">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                        </div>
                    ) : filteredDonors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredDonors.map((donor, index) => (
                                <DonorCard
                                    key={donor._id}
                                    donor={donor}
                                    index={index}
                                    selectedDonor={selectedDonor}
                                    setSelectedDonor={setSelectedDonor} />
                            ))}
                        </div>
                    ) : (
                        /* If  not find any donor */
                        <motion.div
                            className="bg-red-500 rounded-lg p-8 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-3xl font-bold text-gray-100 mb-2">No donors found</h3>
                            <p className="text-gray-100">
                                Try adjusting your filters or search term to find more donors.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Donors;