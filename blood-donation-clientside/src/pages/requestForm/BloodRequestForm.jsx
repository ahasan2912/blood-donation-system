import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const BloodRequestForm = () => {
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({});
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.displayName,
        email: user?.email,
        contactPhone: '',
        age: '',
        bloodType: '',
        hospital: 'Daffodil Medical Center',
        division: '',
        district: '',
        upazila: '',
        urgency: 'normal',
        unitsNeeded: 1,
        role:'recipient'
    });

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        window.scrollTo(0, 0);
        // Fetch the local JSON file for Bangladesh locations
        fetch('/bangladesh_location_full.json') // Make sure this path is correct relative to your public folder
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setLocations(data);
            })
            .catch(err => {
                console.error('Location data load error:', err);
                // toast.error('Failed to load location data.'); // Uncomment if using toast
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newState = {
                ...prev,
                [name]: value
            };

            // Reset district and upazila if division changes
            if (name === 'division') {
                newState.district = '';
                newState.upazila = '';
            }
            // Reset upazila if district changes
            else if (name === 'district') {
                newState.upazila = '';
            }
            return newState;
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Required fields updated with new location fields
        const requiredFields = [
            'age', 'bloodType', 'hospital',
            'division', 'district', 'upazila',
        ];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        // Phone validation (changed to 11 digits for Bangladesh numbers, assuming standard format)
        if (formData.contactPhone && !/^\d{11}$/.test(formData.contactPhone.replace(/\D/g, ''))) {
            newErrors.contactPhone = 'Phone number must be 11 digits';
        }

        // Age validation
        if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 65)) {
            newErrors.age = 'Age must be between 18 and 65';
        }

        // Units needed validation
        if (formData.unitsNeeded < 1) {
            newErrors.unitsNeeded = 'At least 1 unit is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const res = await axiosPublic.post('/recipients', formData);
                if (res?.data?.recipientResult?.insertedId) {
                    toast.success("You have successfully registered as a recipient!");
                    navigate("/dashboard/available-donors");
                }
            } catch (err) {
                toast.error(err.response.data.message);
            }
            // Form Reset
            setFormData({
                name: user?.displayName,
                email: user?.email,
                age: '',
                bloodType: '',
                hospital: 'Daffodil Medical Center',
                division: '',
                district: '',
                upazila: '',
                urgency: 'normal',
                unitsNeeded: 1,
                contactPhone: '',
            });
        }
    };

    // Helper function to get districts based on selected division
    const getDistricts = () => {
        const foundDivision = locations.find(loc => loc.division === formData.division);
        return foundDivision && foundDivision.districts ? Object.keys(foundDivision.districts) : [];
    };

    // Helper function to get upazilas based on selected district
    const getUpazilas = () => {
        const foundDivision = locations.find(loc => loc.division === formData.division);
        if (foundDivision && foundDivision.districts && formData.district) {
            return foundDivision.districts[formData.district] || [];
        }
        return [];
    };

    // framer-motion variants (no changes here)
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-12 md:py-16">
            <h1 className="text-4xl font-bold text-red-600 text-center mt-8">Emergency Blood Request</h1>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 mt-10 border border-red-500">
                <motion.form
                    onSubmit={handleSubmit}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Patient Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Patient Name*</label>
                            <input
                                type="text"
                                name="patientName"
                                value={user?.displayName}
                                readOnly
                                onChange={handleChange}
                                className={`input input-bordered border border-black focus:outline-none focus:border-red-500 w-full py-6 rounded-md ${errors.patientName ? 'border-red-500' : ''}`}
                                placeholder="Full name of patient"
                            />
                            {errors.patientName && <span className="text-red-500 text-sm mt-1">{errors.patientName}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Age*</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                max={65} min={18}
                                onChange={handleChange}
                                className={`input input-bordered border-black focus:outline-none focus:border-red-500 w-full py-6 rounded-md ${errors.age ? 'border-red-500' : ''}`}
                                placeholder="Patient's age"
                            />
                            {errors.age && <span className="text-red-500 text-sm mt-1">{errors.age}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Blood Type Required*</label>
                            <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleChange}
                                className={` border border-black focus:outline-none focus:border-red-500  text-neutral-700 w-full py-3 rounded-md px-2 ${errors.bloodType ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select blood type</option>
                                {bloodTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.bloodType && <span className="text-red-500 text-sm mt-1">{errors.bloodType}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Units Needed*</label>
                            <input
                                type="number"
                                name="unitsNeeded"
                                value={formData.unitsNeeded}
                                onChange={handleChange}
                                min="1"
                                className={`input input-bordered border-black focus:outline-none focus:border-red-500 w-full py-6 rounded-md${errors.unitsNeeded ? 'border-red-500' : ''}`}
                            />
                            {errors.unitsNeeded && <span className="text-red-500 text-sm mt-1">{errors.unitsNeeded}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Division*</label>
                            <select
                                name="division"
                                value={formData.division}
                                onChange={handleChange}
                                className={`border w-full py-3 rounded-md border-black focus:outline-none focus:border-red-500 ${errors.division ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select Division</option>
                                {locations.map((loc, idx) => (
                                    <option key={idx} value={loc.division}>{loc.division}</option>
                                ))}
                            </select>
                            {errors.division && <span className="text-red-500 text-sm mt-1">{errors.division}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">District*</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className={`border w-full py-3 rounded-md border-black focus:outline-none focus:border-red-500 ${errors.district ? 'border-red-500' : ''}`}
                                disabled={!formData.division} // Disable until division is selected
                            >
                                <option value="">Select District</option>
                                {getDistricts().map((district, idx) => (
                                    <option key={idx} value={district}>{district}</option>
                                ))}
                            </select>
                            {errors.district && <span className="text-red-500 text-sm mt-1">{errors.district}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Upazila/Sub-District*</label>
                            <select
                                name="upazila"
                                value={formData.upazila}
                                onChange={handleChange}
                                className={`border w-full py-3 rounded-md border-black focus:outline-none focus:border-red-500 ${errors.upazila ? 'border-red-500' : ''}`}
                                disabled={!formData.district} // Disable until district is selected
                            >
                                <option value="">Select Upazila</option>
                                {getUpazilas().map((upazila, idx) => (
                                    <option key={idx} value={upazila}>{upazila}</option>
                                ))}
                            </select>
                            {errors.upazila && <span className="text-red-500 text-sm mt-1">{errors.upazila}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Hospital/Clinic Name*</label>
                            <input
                                type="text"
                                name="hospital"
                                value={formData.hospital}
                                readOnly
                                onChange={handleChange}
                                className={`input input-bordered border border-black focus:outline-none focus:border-red-500 w-full py-6 rounded-md ${errors.hospital ? 'border-red-500' : ''}`}
                                placeholder="Name of the medical facility"
                            />
                            {errors.hospital && <span className="text-red-500 text-sm mt-1">{errors.hospital}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Urgency Level*</label>
                            <select
                                name="urgency"
                                value={formData.urgency}
                                onChange={handleChange}
                                className="border border-black focus:outline-none focus:border-red-500 text-neutral-700 w-full py-3 rounded-md px-2"
                            >
                                <option value="critical">Critical (Within hours)</option>
                                <option value="urgent">Urgent (Within 24 hours)</option>
                                <option value="normal">Standard (2-3 days)</option>
                                <option value="planned">Planned (Scheduled procedure)</option>
                            </select>
                        </motion.div>
                        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Phone Number*</label>
                            <input
                                type="tel"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                className={`input input-bordered border border-black w-full focus:outline-none focus:border-red-500 py-6 rounded-md ${errors.contactPhone ? 'border-red-500' : ''}`}
                                placeholder="e.g., 01XXXXXXXXX"
                            />
                            {errors.contactPhone && <span className="text-red-500 text-sm mt-1">{errors.contactPhone}</span>}
                        </motion.div>
                    </div>
                    <motion.div
                        className="flex justify-center"
                        variants={itemVariants}
                    >
                        <button
                            type="submit"
                            className="btn bg-red-500 text-white px-8 py-6 w-full"
                        >
                            Submit Blood Request
                        </button>
                    </motion.div>
                </motion.form>
            </div>
        </div>
    );
};

export default BloodRequestForm;
