import { motion } from 'framer-motion'
import TestimonialCard from './TestimonialCard';

const CommunityReview = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Regular Donor',
      quote: 'I\'ve been donating blood for five years now. It\'s such a simple way to make a huge difference in someone\'s life. The team always makes me feel comfortable and valued.',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Blood Recipient',
      quote: 'After my accident, I needed multiple blood transfusions. I\'m alive today because strangers donated their blood. Now I\'m a regular donor myself to pay it forward.',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Priya Patel',
      position: 'Doctor',
      quote: 'As a physician, I\'ve seen countless lives saved through blood transfusions. Regular donors are true heroes in our healthcare system. We simply couldn\'t save as many lives without them.',
      image: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      name: 'James Wilson',
      position: 'First-time Donor',
      quote: 'I was nervous about donating for the first time, but the staff was so friendly and professional. The process was quick and painless. I\'ll definitely be back!',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-red-700 text-center my-7">What Our Community Says</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-gray-700">
            Hear from donors, recipients, and healthcare professionals about the impact of blood donation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CommunityReview;