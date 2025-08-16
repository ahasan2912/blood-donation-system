import { motion } from 'framer-motion'
import { FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post, index }) => {

    return (
        <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden shadow-md card-hover flex flex-col"
        >
            <div className="h-48 overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                        {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaUser className="text-red-500" />
                        <span className='font-semibold'>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaCalendarAlt className="text-red-500" />
                        <span className='font-semibold'>{post.date}</span>
                    </div>
                </div>
                <Link to="/blogs">
                    <button className="mt-4 text-red-600 inline-flex items-center gap-2 font-medium hover:gap-3 transition-all">
                        Read Article <FaArrowRight />
                    </button>
                </Link>
            </div>
        </motion.article>
    );
};

export default BlogPostCard;