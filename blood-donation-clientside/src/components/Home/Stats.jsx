import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useDonorList from '../../hooks/useDonorList'
import useUserList from '../../hooks/useUserList'
import useRecipientList from '../../hooks/useRecipientList'
import useTotalBooked from '../../hooks/useTotalBooked'

const Stats = () => {
  const [donors] = useDonorList();
  const [users] = useUserList();
  const [recipients] = useRecipientList();
  const [booked] = useTotalBooked();

  const [stats, setStats] = useState([
    { id: 4, value: 0, target: booked?.length, label: 'Lives Saved', suffix: '+' },
    { id: 1, value: 0, target: users?.length, label: 'Total Users', suffix: '+' },
    { id: 2, value: 0, target: donors?.length, label: 'Registered Donors', suffix: '+' },
    { id: 3, value: 0, target: recipients?.length, label: 'Registered Recipients', suffix: '+' },
  ])

  useEffect(() => {
  if (users && donors && recipients && booked) {
    setStats(prev =>
      prev.map(stat => {
        if (stat.id === 1) return { ...stat, target: users.length };
        if (stat.id === 2) return { ...stat, target: donors.length };
        if (stat.id === 3) return { ...stat, target: recipients.length };
        if (stat.id === 4) return { ...stat, target: booked.length };
        return stat;
      })
    );
  }
}, [users, donors, recipients, booked]);

  useEffect(() => {
    // Animation for counting up
    const animationDuration = 2000 // 2 seconds
    const framesPerSecond = 60
    const totalFrames = animationDuration / 1000 * framesPerSecond

    let frame = 0
    const interval = setInterval(() => {
      frame++

      if (frame <= totalFrames) {
        const progress = frame / totalFrames
        setStats(prevStats =>
          prevStats.map(stat => ({
            ...stat,
            value: Math.round(stat.target * progress)
          }))
        )
      } else {
        clearInterval(interval)
      }
    }, 1000 / framesPerSecond)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      className="py-16 bg-red-500 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <h3 className="text-5xl font-bold mb-2">
                {stat.value.toLocaleString()}{stat.suffix}
              </h3>
              <p className="text-xl text-primary-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Stats