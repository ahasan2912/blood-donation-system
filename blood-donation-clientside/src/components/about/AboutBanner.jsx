import { motion } from 'framer-motion';

const AboutBanner = () => {
    // Animation variants for controlled staggering and effects
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative py-24 md:py-32 bg-gray-900 px-4 overflow-hidden">
            {/* Background Image with Dark Overlay (similar to BlogBanner) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg)' }}
                aria-hidden="true" // Hidden from screen readers as it's purely decorative
            >
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black opacity-60"></div> {/* Increased opacity for better contrast */}
            </div>

            {/* Content Container */}
            <div className="container mx-auto relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-4xl mx-auto"
                >
                    {/* Heading */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight" // Font size and weight adjusted
                    >
                        About BloodLink
                    </motion.h1>
                    {/* Sub-heading/Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-200 mb-10 opacity-90 leading-relaxed font-normal" // Opacity and font weight adjusted
                    >
                        LifeFlow is a dedicated platform connecting blood donors with those in need. Our mission is to ensure that no life is lost due to blood shortage.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

export default AboutBanner;
