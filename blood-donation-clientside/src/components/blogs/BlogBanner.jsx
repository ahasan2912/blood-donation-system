import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa';
const BlogBanner = ({ searchTerm, setSearchTerm }) => {
    return (
        <section className="relative py-32 bg-gray-900 px-4">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: 'url(https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg)' }}
            ></div>
            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up">Blog & Resources</h1>
                    <p className="text-xl text-white mb-8" data-aos="fade-up" data-aos-delay="100">
                        Stay informed with the latest news, research, and stories from the world of blood donation.
                    </p>
                    <div className="relative max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-5 py-3 pr-12 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-300 border-2 border-gray-200 placeholder:text-white text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-100" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogBanner;