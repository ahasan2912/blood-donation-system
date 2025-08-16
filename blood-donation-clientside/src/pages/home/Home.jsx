import { useEffect } from 'react';
import Banner from '../../components/Home/Banner';
import BloodTypesInfo from '../../components/Home/BloodTypesInfo';
import CommunityReview from '../../components/Home/CommunityReview';
import DonationProcess from '../../components/Home/DonationProcess';
import Stats from '../../components/Home/Stats';
import Testimonial from '../../components/Home/Testimonial';
import ChoiceUs from '../../components/Home/ChoiceUs';
import HomeRegisterFrom from '../../components/Home/HospitalRegistrationFrom';
import FqaSection from '../../components/Home/FqaSection';

const Home = () => {
    // Application title
    useEffect(() => {
        document.title = "Home | Blood Donation Application";
    }, []);
    return (
        <div>
            <Banner />
            <Stats />
            <ChoiceUs/>
            <BloodTypesInfo />
            <DonationProcess />
            <CommunityReview />
            <HomeRegisterFrom/>
            <Testimonial />
            <FqaSection/>
        </div>
    );
};

export default Home;