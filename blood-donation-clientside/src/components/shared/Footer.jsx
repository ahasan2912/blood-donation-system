import { Link } from 'react-router-dom'
import { IoMdWater } from 'react-icons/io'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo and short description */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <IoMdWater className="text-3xl mr-2 text-red-500" />
                                <span className="text-2xl font-display font-bold">BloodLink</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Connecting donors with recipients, saving lives through timely and efficient blood management.
                            </p>
                            <div className="flex space-x-4 pt-2">
                                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="Facebook">
                                    <FaFacebook className="text-xl" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="Twitter">
                                    <FaTwitter className="text-xl" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="Instagram">
                                    <FaInstagram className="text-xl" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors" aria-label="LinkedIn">
                                    <FaLinkedin className="text-xl" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link to="/donors" className="text-gray-400 hover:text-primary-500 transition-colors">Donors</Link>
                                </li>
                                <li>
                                    <Link to="/blogs" className="text-gray-400 hover:text-primary-500 transition-colors">Blogs</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors">About Us</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <FaMapMarkerAlt className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-400">Daffodil Medical Center, Ashulia, Savar, Dhaka</span>
                                </li>
                                <li className="flex items-center">
                                    <FaPhone className="text-red-500 mr-3 flex-shrink-0" />
                                    <span className="text-gray-400">+8801796905988</span>
                                </li>
                                <li className="flex items-center">
                                    <FaEnvelope className="text-red-500 mr-3 flex-shrink-0" />
                                    <span className="text-gray-400">ahasanhabib2912@gmail.com</span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Subscribe to Newsletter</h3>
                            <p className="text-gray-400 mb-4">Stay updated with our latest news and announcements.</p>
                            <form className="space-y-3">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {currentYear} BloodLink. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="/" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
                            <a href="/" className="hover:text-primary-500 transition-colors">Terms of Service</a>
                            <a href="/" className="hover:text-primary-500 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer