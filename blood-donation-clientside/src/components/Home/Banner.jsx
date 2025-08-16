import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import banner1 from '../../assets/Banner/banner1.webp'
import useRole from '../../hooks/useRole';
import useUserList from '../../hooks/useUserList';
import useTotalBooked from '../../hooks/useTotalBooked';

const Banner = () => {
    const [role] = useRole();
    const [users] = useUserList();
    const [booked] = useTotalBooked();
    return (
        <section className="relative bg-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/5 z-0"></div>
            {/* Hero Content */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="z-10"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900">
                            Donate <span className="text-[#EF4444]">Blood</span>, Save Lives
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                            Your donation can save up to three lives. Join our community of heroes and make a difference today.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/blood-donate-registration"
                                className="btn bg-[#EF4444] rounded-4xl outline- border-0 text-white"
                            >
                                Become a Donor
                            </Link>
                            <Link
                                to="/about"
                                className="btn bg-[#4884e6] rounded-4xl outline- border-0 text-white"
                            >
                                Learn More
                            </Link>
                            {
                                role==='user' ? <Link
                                to="/hospital-registration"
                                className="btn bg-[#EF4444] rounded-4xl outline- border-0 text-white"
                            >
                                Registration Hospital
                            </Link> : ''
                            }
                            
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            <div className="text-left">
                                <p className="text-3xl font-bold text-red-500">{booked?.length}+</p>
                                <p className="text-gray-600 text-sm">Lives Saved</p>
                            </div>
                            <div className="text-left">
                                <p className="text-3xl font-bold text-red-500">30 min</p>
                                <p className="text-gray-600 text-sm">Process Time</p>
                            </div>
                            <div className="text-left">
                                <p className="text-3xl font-bold text-red-500">60 days</p>
                                <p className="text-gray-600 text-sm">Recovery</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="z-10"
                    >
                        <img
                            src={banner1}
                            className="w-full h-auto object-cover rounded-lg shadow-xl"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-wave-pattern bg-repeat-x"></div>
        </section>
    );
};

export default Banner;