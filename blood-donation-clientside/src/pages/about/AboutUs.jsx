import React from 'react';
import AboutBanner from '../../components/about/AboutBanner';
import BloodDonationWork from '../../components/about/BloodDonationWork';
import BenefitDonation from '../../components/about/BenefitDonation';

const AboutUs = () => {
    return (
        <div>
            <AboutBanner/>
            <BloodDonationWork/>
            <BenefitDonation/>
        </div>
    );
};

export default AboutUs;