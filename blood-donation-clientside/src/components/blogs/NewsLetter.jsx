import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle';

const NewsLetter = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
                <div className="max-w-3xl mx-auto text-center">
                    <SectionTitle
                        title="Subscribe to Our Newsletter"
                        subtitle="Get the latest articles, news, and updates about blood donation delivered directly to your inbox."
                        centered={true}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-8"
                    >
                        <form className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow px-4 py-2 rounded-lg  border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                                required
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="btn bg-red-600 text-white px-6 py-[22px] whitespace-nowrap text-lg rounded-lg md:rounded-s-lg"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                        <p className="text-sm text-gray-500 mt-3">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;