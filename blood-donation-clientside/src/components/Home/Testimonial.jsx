import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Testimonial = () => {
  const [active, setActive] = useState(0)
  
  const testimonials = [
    {
      id: 1,
      quote: "I've been donating blood regularly for the past 5 years. It's such a small thing that makes such a huge difference. The staff at LifeBlood are always friendly and professional.",
      name: "Sarah Johnson",
      role: "Regular Donor",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      quote: "After my surgery, I needed multiple blood transfusions. I'm alive today because strangers took the time to donate. Now I donate whenever I can to pay it forward.",
      name: "Michael Chen",
      role: "Recipient & Donor",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      quote: "As a nurse, I've seen firsthand how blood donations save lives every day. The process is quick, easy, and one of the most impactful ways to help others.",
      name: "Dr. Lisa Rodriguez",
      role: "Healthcare Professional",
      image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ]

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }
  
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="pt-1 bg-gray-50 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-red-700 text-4xl font-bold my-7" data-aos="fade-up ">Testimonials</h2>
          <p className="text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Hear from donors and recipients whose lives have been touched by blood donation.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-6xl text-red-500 opacity-50">
              &quot;
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img 
                    src={testimonials[active].image} 
                    alt={testimonials[active].name}
                    className="w-full h-full object-cover rounded-full border-4 border-red-400"
                  />
                </div>
                
                {/* Content */}
                <div>
                  <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                    "{testimonials[active].quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div>
                      <cite className="not-italic font-semibold text-gray-900">
                        {testimonials[active].name}
                      </cite>
                      <p className="text-red-500 font-semibold">{testimonials[active].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={handlePrev}
                className="btn btn-circle btn-sm bg-gray-400 border-0 font-bold"
                aria-label="Previous testimonial"
              >
                ❮
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActive(index)}
                    className={`w-3 h-3 rounded-full ${active === index ? 'bg-red-500' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={handleNext}
                className="btn btn-circle btn-sm bg-gray-400 font-bold border-0"
                aria-label="Next testimonial"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial