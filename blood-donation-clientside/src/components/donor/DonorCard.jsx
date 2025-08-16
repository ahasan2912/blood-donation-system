import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUser, FaCalculator, FaCalendar, FaPhoneAlt, FaUserTie, FaTint } from 'react-icons/fa';
import { getMonthDayDifference, isThreeMonthsPassed } from './utils';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAddCall, MdEmail } from 'react-icons/md';

const DonorCard = ({ donor, index, selectedDonor, setSelectedDonor, }) => {
  
  const {
    name,
    age,
    bloodType,
    lastDonation,
    division,
    district,
    subDistrict,
    donationCount,
    gender
  } = donor;

  const cityDisplay = `${subDistrict}, ${district}, ${division}`;
  const isAvailable = isThreeMonthsPassed(lastDonation);
  const dateCount = getMonthDayDifference(lastDonation);

  const handleContactInfo = (donor) => {
    setSelectedDonor(donor);
    document.getElementById('my_modal').showModal();
  }

  return (
    <motion.div
      className="bg-white rounded-lg border border-red-300 overflow-hidden "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <div className="flex items-center sm:items-start md:items-center text-gray-600 mt-1">
              <FaMapMarkerAlt className="mr-1 sm:mt-1 md:mt-0 text-primary-500" />
              <span>{cityDisplay}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center ${isAvailable ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
              }`}>
              {bloodType}
            </div>
            <span className={`text-xs mt-1 font-medium px-2 py-0.5 rounded-full ${isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-600'
              }`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center text-gray-600">
              <FaUser className="mr-2 text-red-500" />
              <span className="text-sm sm:text-base">{donationCount} donation{donationCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaCalculator className="mr-2 text-red-500" />
              <span className="text-sm sm:text-base">{age} years</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaCalendar className="mr-2 text-red-500" />
              <span className="text-sm sm:text-base">{dateCount}</span>
            </div>
            <div className="flex items-center text-gray-600 sm:col-span-3 lg:col-span-1">
              <FaUserTie className="mr-2 text-red-500" />
              <span className="text-sm sm:text-base">{gender}</span>
            </div>
          </div>
        </div>

        {isAvailable && (
          <div className="mt-5">
            <button
              onClick={() => handleContactInfo(donor)}
              className="btn bg-red-500 w-full text-white py-2 px-4 rounded-lg flex items-center justify-center">
              <FaPhoneAlt className="mr-2" /> Contact
            </button>
          </div>
        )}
        {/* ContactInformation Modal*/}
        {
          selectedDonor && (
            <dialog id="my_modal" className="modal">
              <div className="modal-box bg-red-50 border-l-8 border-red-500 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 p-2 rounded-full text-red-600">
                    <FaTint size={23} />
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">{selectedDonor.name} <span className='text-black'>Contact Information</span></h3>
                </div>
                <div className='flex items-center gap-3 flex-wrap'>
                  <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                    <FaLocationDot size={20} />
                  </div>
                  <span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.subDistrict}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.district}</span><span className='font-bold text-base bg-green-300 px-2 rounded-sm'>{selectedDonor.division}</span>
                </div>
                <div className='my-5'>
                  <div className='flex items-center gap-3'>
                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                      <MdAddCall size={23} />
                    </div>
                    <h3 className="text-xl font-bold text-red-600">Contact<span className='text-black'> Number: <span className='bg-green-300 px-2 rounded-sm'>{selectedDonor.contactNumber}</span></span></h3>
                  </div>
                  <div className='flex items-center gap-3 mt-4'>
                    <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                      <MdEmail size={23} />
                    </div>
                    <h3 className="text-xl font-bold text-red-600">Eamil<span className='text-black'> Address: <span className='bg-green-300 px-2 rounded-sm'>{selectedDonor.email}</span></span></h3>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn bg-red-500 hover:bg-red-600 text-white font-semibold">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          )
        }
      </div>
    </motion.div>
  );
};

export default DonorCard;