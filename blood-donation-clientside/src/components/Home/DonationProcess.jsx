import { motion } from 'framer-motion'
import { FaUserCheck, FaStethoscope, FaHeart, FaCoffee } from 'react-icons/fa'

const DonationProcess = () => {
  const steps = [
    {
      title: 'Registration',
      description: 'Complete a registration form with your personal information and medical history.',
      icon: <FaUserCheck className="text-4xl text-white" />
    },
    {
      title: 'Screening',
      description: 'Undergo a brief health screening including blood pressure, pulse, and hemoglobin levels.',
      icon: <FaStethoscope className="text-4xl text-white" />
    },
    {
      title: 'Donation',
      description: 'The actual blood donation process takes only 8-10 minutes, collecting about 450ml of blood.',
      icon: <FaHeart className="text-4xl text-white" />
    },
    {
      title: 'Recovery',
      description: 'Relax and enjoy refreshments for 15 minutes while your body begins to replenish fluids.',
      icon: <FaCoffee className="text-4xl text-white" />
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-700 text-center my-7">The Donation Process</h2>
        <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-gray-700">
          Donating blood is a simple four-step process that takes less than an hour of your time 
          but can save multiple lives.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center"
              variants={item}
            >
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                {step.icon}
              </div>
              <div className="relative w-full flex justify-center mb-4">
                <div className="bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-red-200 -z-10 hidden lg:block"></div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-red-700">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DonationProcess