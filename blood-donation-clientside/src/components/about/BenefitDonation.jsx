import React from 'react';
import { motion } from 'framer-motion'
import SectionTitle from '../blogs/SectionTitle';
import { FaCheck, FaHeartbeat, FaUserMd, FaUsers } from 'react-icons/fa';
const BenefitDonation = () => {

    const benefitsData = [
        {
            icon: <FaHeartbeat className="text-3xl text-red-600" />,
            title: "Health Benefits",
            description: "Regular blood donation is linked to reduced risk of heart attacks and lower cholesterol levels."
        },
        {
            icon: <FaUserMd className="text-3xl text-red-600" />,
            title: "Free Health Check",
            description: "Every donation includes a mini health screening, giving you insights into your health condition."
        },
        {
            icon: <FaUsers className="text-3xl text-red-600" />,
            title: "Help Others",
            description: "Each donation can save up to three lives, making a significant impact on patients in need."
        },
        {
            icon: <FaCheck className="text-3xl text-red-600" />,
            title: "Community Impact",
            description: "Be part of a vital community service that ensures blood supply during emergencies and surgeries."
        }
    ]
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <SectionTitle
                    title="Benefits of Blood Donation"
                    subtitle="Donating blood not only helps others but also offers several health benefits to donors."
                    centered={true}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {benefitsData.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-md border-1 border-gray-100 hover:border-red-300 transition-colors card-hover"
                        >
                            <div className="mb-4">{benefit.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitDonation;