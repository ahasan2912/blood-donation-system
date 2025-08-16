import { FaDna, FaHandHoldingMedical, FaHospitalUser, FaUser, FaUserMd, FaUsers } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import ChoiceCard from './ChoiceCard';

const ChoiceUs = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-red-700 text-center my-7" data-aos="fade-up">Why Choose BloodLink?</h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Our state-of-the-art blood management system ensures efficiency, safety, and accessibility
                        for both donors and recipients.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ChoiceCard
                        title={`Easy Donation Process`}
                        description={`Our streamlined process makes blood donation quick, comfortable, and convenient for all donors.`}
                    >
                        <FaHandHoldingMedical />
                    </ChoiceCard>
                    <ChoiceCard
                        title={`Advanced Blood Typing`}
                        description={`Precise blood typing and matching ensures compatibility and safety for all transfusions.`}
                    >
                        <FaDna />
                    </ChoiceCard>
                    <ChoiceCard
                        title={`Expert Medical Team`}
                        description={`Our certified medical professionals ensure the highest standards of care and safety.`}
                    >
                        <FaUserMd />
                    </ChoiceCard>
                    <ChoiceCard
                        title={`Blood Availability Tracking`}
                        description={`Real-time inventory management ensures blood is available when and where needed most.`}
                    >
                        <MdBloodtype />
                    </ChoiceCard>
                    <ChoiceCard
                        title={`Hospital Integration`}
                        description={`Seamless integration with healthcare providers ensures rapid response in emergency situations.`}
                    >
                        <FaHospitalUser />
                    </ChoiceCard>
                    <ChoiceCard
                        title={`Community Engagement`}
                        description={`Regular blood drives and educational programs to promote awareness and increase donations.`}
                    >
                        <FaUsers/>
                    </ChoiceCard>
                </div>
            </div>
        </section>
    );
};

export default ChoiceUs;