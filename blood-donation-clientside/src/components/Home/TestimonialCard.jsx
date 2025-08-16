import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa'

const TestimonialCard = ({ name, position, quote, image, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <FaQuoteLeft className="text-red-300 text-3xl mb-4" />
      <p className="text-gray-700 mb-6 flex flex-col flex-grow">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-gray-600 text-sm">{position}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard