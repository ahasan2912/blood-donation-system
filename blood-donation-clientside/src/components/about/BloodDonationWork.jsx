import React from 'react';
import SectionTitle from '../blogs/SectionTitle';
import { motion } from 'framer-motion'

const BloodDonationWork = () => {
    const stepsData = [
        {
            step: 1,
            title: "Registration",
            description: "Sign up as a donor by completing a simple registration form with your personal and medical information."
        },
        {
            step: 2,
            title: "Screening",
            description: "Undergo a basic health check, including hemoglobin level test, blood pressure, and pulse rate measurement."
        },
        {
            step: 3,
            title: "Donation",
            description: "The actual blood donation process takes about 8-10 minutes, while the entire visit may take 45-60 minutes."
        },
        {
            step: 4,
            title: "Recovery",
            description: "Relax for 10-15 minutes with refreshments to help your body adjust after donating blood."
        }
    ]
    return (
        <section className="py-16 bg-gray-50 px-4">
            <div className="container mx-auto">
                <SectionTitle
                    title="How Blood Donation Works"
                    subtitle="The process is simple, safe, and takes just a few steps to help save lives."
                    centered={true}
                />
                <div className="grid md:grid-cols-4 gap-6 mt-12">
                    {stepsData.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-md relative my-3"
                        >
                            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BloodDonationWork;