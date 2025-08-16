import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const HospitalRequestForm = () => {
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({});
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        name: user?.displayName,
        HospitalName: '',
        email: user?.email,
        photo: user?.photoURL,
        division: '',
        district: '',
        subDistrict: '',
        contactNumber: '',

    });



    // fetch location from jsondata
    useEffect(() => {
        window.scrollTo(0, 0);

        fetch('/bangladesh_location_full.json')
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
                console.error('Location load error:', err);
                toast.error('Failed to load location data.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newState = {
                ...prev,
                [name]: value
            };

            // If division changes, reset district and subDistrict
            if (name === 'division') {
                newState.district = '';
                newState.subDistrict = '';
            }
            // If district changes, reset subDistrict
            else if (name === 'district') {
                newState.subDistrict = '';
            }
            return newState;
        });

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['name', 'HospitalName', 'division', 'district', 'subDistrict', 'contactNumber'];;
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        if (formData.contactNumber && !/^\d{11}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
            newErrors.contactNumber = 'Phone number must be 11 digits';
        }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await axiosPublic.post('/hospital', formData);
            if (res?.data?.hospitalResult?.insertedId) {
                toast.success("You have successfully registered as a donor!");
                navigate("/");
            }
            // Reset the form
            setFormData({
                name: user?.displayName || '',
                HospitalName: '',
                email: user?.email || '',
                photo: user?.photoURL || '',
                division: '',
                district: '',
                subDistrict: '',
                contactNumber: '',
            });
        } catch (err) {
            toast.error('You are already registered as a donor.');
            console.error(err);
        }
    };

    const getDistricts = () => {
        setFormData
        const foundDivision = locations.find(loc => loc.division === formData.division);
        return foundDivision && foundDivision.districts ? Object.keys(foundDivision.districts) : [];
    };

    // New function to get sub-districts (Upazilas) based on selected division and district
    const getSubDistricts = () => {
        const foundDivision = locations.find(loc => loc.division === formData.division);
        if (foundDivision && foundDivision.districts && formData.district) {
            return foundDivision.districts[formData.district] || [];
        }
        return [];
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-12 md:py-16">
            <h1 className="text-4xl font-bold text-red-600 text-center mt-8"> Hospital Registration Form</h1>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 mt-10 border border-red-500">
                <motion.form
                    onSubmit={handleSubmit}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hospital Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Author Name*</label>
                            <input type="text" name="name" readOnly value={formData.name} onChange={handleChange}
                                className={`input input-borderedw-full py-6 rounded-md border border-black  focus:outline-none focus:border-red-500 ${errors.name ? 'border-red-500' : ''}`} placeholder='Enter your name' />
                            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                        </motion.div>
                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Hospital Name*</label>
                            <input type="text" name="HospitalName" value={formData.HospitalName} onChange={handleChange}
                                className={`input input-borderedw-full py-6 rounded-md border border-black  focus:outline-none focus:border-red-500 ${errors.HospitalName ? 'border-red-500' : ''}`} placeholder='Enter your Hospitalname' />
                            {errors.HospitalName && <span className="text-red-500 text-sm mt-1">{errors.HospitalName}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Division*</label>
                            <select name="division" value={formData.division} onChange={handleChange}
                                className={`border w-full py-3 rounded-md border-black  focus:outline-none focus:border-red-500 ${errors.division ? 'border-red-500' : ''}`}>
                                <option value="">Select Division</option>
                                {locations.map((d, idx) => (
                                    <option key={idx} value={d.division}>{d.division}</option>
                                ))}
                            </select>
                            {errors.division && <span className="text-red-500 text-sm mt-1">{errors.division}</span>}
                        </motion.div>

                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">District*</label>
                            <select name="district" value={formData.district} onChange={handleChange}
                                className={`border w-full py-3 rounded-md border-black  focus:outline-none focus:border-red-500 ${errors.district ? 'border-red-500' : ''}`}
                                disabled={!formData.division}
                            >
                                <option value="">Select District</option>
                                {getDistricts().map((district, idx) => (
                                    <option key={idx} value={district}>{district}</option>
                                ))}
                            </select>
                            {errors.district && <span className="text-red-500 text-sm mt-1">{errors.district}</span>}
                        </motion.div>

                        {/* New: Sub-District / Upazila Dropdown */}
                        <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Sub-District/Upazila*</label>
                            <select name="subDistrict" value={formData.subDistrict} onChange={handleChange}
                                className={`border w-full py-3 rounded-md border-black  focus:outline-none focus:border-red-500 ${errors.subDistrict ? 'border-red-500' : ''}`}
                                disabled={!formData.district}
                            >
                                <option value="">Select Upazila</option>
                                {getSubDistricts().map((upazila, idx) => (
                                    <option key={idx} value={upazila}>{upazila}</option>
                                ))}
                            </select>
                            {errors.subDistrict && <span className="text-red-500 text-sm mt-1">{errors.subDistrict}</span>}
                        </motion.div>








                        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
                            <label className="font-medium text-neutral-700">Phone Number*</label>
                            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange}
                                className={`input input-bordered w-full py-6 rounded-md border-black  focus:outline-none focus:border-red-500 ${errors.contactNumber ? 'border-red-500' : ''}`} placeholder='Enter your valid phone number' />
                            {errors.contactNumber && <span className="text-red-500 text-sm mt-1">{errors.contactNumber}</span>}
                        </motion.div>
                    </div>

                    <motion.div className="flex justify-center" variants={itemVariants}>
                        <button type="submit" className="btn bg-red-500 text-white px-8 py-6 w-full">
                            Hospital Registration
                        </button>
                    </motion.div>
                </motion.form>
            </div>
        </div>
    );
};

export default HospitalRequestForm;


