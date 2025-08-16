import { FaHeartbeat, FaHospitalSymbol } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useRole from '../../hooks/useRole';
const HospitalRegistrationFrom = () => {
    const [role] = useRole();
    const isUser = (role==='user');
    return (
        <section id="donor-form" className="section flex flex-col items-center justify-center bg-red-500 text-white py-20 px-5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left content: Ready to Become a Donor? */}
                    <div data-aos="fade-up" data-aos-duration="1000">
                        <h2 className="text-2xl md:text-5xl font-extrabold mb-7 leading-tight">
                            Partner with Our Blood Donation Network
                        </h2>
                        <p className="text-lg text-red-200 mb-9 leading-relaxed font-light">
                            Join hands with us to ensure a steady and reliable supply of blood for your patients.
                            By partnering, your hospital gains access to a dedicated donor pool and streamlined blood requests.
                        </p>
                        <ul className="space-y-4 mb-10">
                            <li className="flex items-start text-lg"> 
                                <svg className="w-6 h-6 mr-3 text-red-300 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span>Ensure timely blood availability for your patients</span>
                            </li>
                            <li className="flex items-start text-lg">
                                <svg className="w-6 h-6 mr-3 text-red-300 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span>Streamlined process for requesting blood units</span>
                            </li>
                            <li className="flex items-start text-lg">
                                <svg className="w-6 h-6 mr-3 text-red-300 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span>Access to a robust network of voluntary blood donors</span>
                            </li>
                            <li className="flex items-start text-lg">
                                <svg className="w-6 h-6 mr-3 text-red-300 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span>Collaborative efforts to save more lives</span>
                            </li>
                        </ul>
                    </div>
                    {/* Right content: Become a Donor Card */}
                    <div data-aos="fade-up" className="w-full flex justify-center items-center h-full min-h-[400px]">
                        <div className="bg-white text-gray-800 rounded-lg p-8 shadow-xl max-w-3xl w-full text-center border-2 border-red-500 transform transition-transform duration-300 hover:scale-105">
                            <FaHospitalSymbol className="text-red-500 text-6xl mx-auto mb-6" />
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight">Become a Hospital Partner!</h3>
                            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                                Connect your hospital with our extensive blood donor network. Let's work together to save lives
                                and improve healthcare services across the region.
                            </p>
                            <NavLink to='/hospital-registration'>
                                <button disabled={!isUser} className="bg-red-500 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300 transform hover:scale-105">Register For Hospital</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HospitalRegistrationFrom;

