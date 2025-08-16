import { FaTint, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { MdEmail } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import image from '../../../assets/banner-mc.png'
import { Link } from 'react-router-dom';


const HospitalHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    // Fetch recipient data for current user email
    const { data: hospitalData } = useQuery({
        queryKey: ['hospitalData', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/hospital/${user?.email}`);
            return res.data[0];
        }
    });

    return (
        <div>
            <div className="bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/src/assets/hospitalBanner.jpg')] bg-cover bg-center shadow-lg rounded-xl p-6 h-[50vh] relative">
                <div className='flex flex-col items-center justify-center h-[40vh]'>
                    <h1 className='text-4xl lg:text-5xl font-bold text-white'>Daffodil Medical Center</h1>
                    <p className='text-white text-xl mt-2 max-w-3xl mx-auto text-center'>Daffodil Medical Center is a modern healthcare facility committed to providing compassionate and quality medical services.</p>
                </div>
                <div className="flex items-center gap-4 mb-6 absolute top-2 left-2">
                    <img
                        src={user?.photoURL}
                        alt={user?.displayName}
                        className="w-24 h-24 object-cover rounded-full border-4 border-red-500"
                    />
                    <div>
                        <h2 className="text-2xl text-white font-bold">{user?.displayName}</h2>
                        <p className="text-lg text-white mt-1 flex items-center gap-2"><FaMapMarkerAlt size={22} />{hospitalData?.subDistrict}, {hospitalData?.district}, {hospitalData?.division}</p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Left Content */}
                <div className="md:col-span-3">
                    <img
                        src={image}
                        alt="Medical Team"
                        className="rounded-lg mb-6 w-full object-fill h-[120px] md:h-[250px]"
                    />
                    <p className="mb-4 text-gray-800">
                        Daffodil International University (DIU) values the well-being of its students,
                        teachers, and employees. Health is of utmost importance, and as such, DIU has
                        a well-equipped Medical Centre available at Daffodil Smart City. The medical
                        center operates 16 hours a day, from 8 am to 12 am, ensuring that emergency
                        medical care and first aid are available to students and employees at all times.
                    </p>

                    <p className="mb-4 text-gray-800">
                        The medical center staff is responsible for providing prompt healthcare support
                        to all members of the Daffodil Family. Their roles include handling emergencies,
                        providing first aid, prescribing medicines, and referring serious cases to
                        authorized hospitals as required. They also provide health support to local and
                        international students participating in cross-cultural/exchange programs.
                    </p>

                    <p className="text-gray-800">
                        In addition, the medical center staff prepares health cards upon request and provides medical support during events such as sports tournaments, Foundation anniversary, convocation, and other similar occasions. They conduct health check-ups and ensure an acceptable standard of public health and sanitation throughout the university campus.
                    </p>

                    <p className="text-gray-800">
                        The medical center staff also organize vaccination programs for the prevention of communicable diseases, as well as health camps, blood donation drives, and other healthcare-related campaigns. With the medical center operating 16 hours a day, DIU ensures that its stakeholders have access to healthcare services whenever they need it, at a nominal cost.
                    </p>
                    <p><span className='font-semibold'>Services:</span> Emergency support available from 8 am to 12 am</p>

                    <ul className="list-disc list-inside text-gray-800 space-y-2 my-4">
                        <li>First aid services</li>
                        <li>Prescription of medicines to students, teachers, and staff</li>
                        <li>Health support for local and international students studying and visiting DIU, including nebulization, sugar tests, blood pressure tests, and oxygen therapy</li>
                        <li>Referral of serious patients to authorized hospitals as needed</li>
                        <li>Preparation of health cards upon request</li>
                        <li>Medical support during events such as sports tournaments, Foundation anniversary, convocation, and others</li>
                        <li>Health check-ups</li>
                        <li>Ensuring an acceptable standard of public health and sanitation across the university campus</li>
                        <li>Organization of vaccination programs for the prevention of communicable diseases</li>
                        <li>Arrangement of health camps, blood donation drives, and other healthcare-related campaigns</li>
                    </ul>
                </div>

                {/* Sidebar */}
                <div className="space-y-2">
                    <h2 className="font-semibold text-2xl pb-1">Medical Center</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <Link to='https://daffodilvarsity.edu.bd/medical/diu-medical-center' className="hover:text-red-600 cursor-pointer">Preamble</Link>
                        </li>
                        <li>
                            <Link to='https://daffodilvarsity.edu.bd/medical/medical-personnel' className="hover:text-red-600 cursor-pointer">Medical Personnel</Link>
                        </li>
                        <li>
                            <Link to='https://daffodilvarsity.edu.bd/medical/medical-facilities' className="hover:text-red-600 cursor-pointer">Medical Facilities</Link>
                        </li>
                        <li>
                            <Link to='https://daffodilvarsity.edu.bd/medical/operating-hours' className="hover:text-red-600 cursor-pointer">Operating Hours</Link>
                        </li>
                        <li>
                            <Link to='https://daffodilvarsity.edu.bd/medical/medical-center-collaboration' className="hover:text-red-600 cursor-pointer">Collaboration</Link>
                        </li>
                        <li>
                            <Link to='https://daffodilvarsity.edu.bd/medical-gallery' className="hover:text-red-600 cursor-pointer">Photo Gallery</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HospitalHome;