import { motion } from 'framer-motion'

const BloodTypesInfo = () => {
  const bloodTypes = [
    { 
      type: 'A+', 
      canDonateTo: ['A+', 'AB+'], 
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      percentage: '35.7%'
    },
    { 
      type: 'A-', 
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], 
      canReceiveFrom: ['A-', 'O-'],
      percentage: '6.3%'
    },
    { 
      type: 'B+', 
      canDonateTo: ['B+', 'AB+'], 
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      percentage: '8.5%'
    },
    { 
      type: 'B-', 
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], 
      canReceiveFrom: ['B-', 'O-'],
      percentage: '1.5%'
    },
    { 
      type: 'AB+', 
      canDonateTo: ['AB+'], 
      canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      percentage: '3.4%'
    },
    { 
      type: 'AB-', 
      canDonateTo: ['AB+', 'AB-'], 
      canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
      percentage: '0.6%'
    },
    { 
      type: 'O+', 
      canDonateTo: ['A+', 'B+', 'AB+', 'O+'], 
      canReceiveFrom: ['O+', 'O-'],
      percentage: '37.4%'
    },
    { 
      type: 'O-', 
      canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
      canReceiveFrom: ['O-'],
      percentage: '6.6%'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-700 text-center my-7">Understanding Blood Types</h2>
        <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-gray-700">
          Your blood type determines who you can donate to and receive from. 
          Learn about blood type compatibility to understand your donation&apos;s impact.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodTypes.map((blood, index) => (
            <motion.div
              key={blood.type}
              className="bg-white rounded-lg shadow-md overflow-hidden card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-red-600 py-4">
                <h3 className="text-3xl font-bold text-center text-white">{blood.type}</h3>
                <p className="text-center text-lg text-gray-200">{blood.percentage} of population</p>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <h4 className="font-medium text-xl text-gray-700">Can donate to:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {blood.canDonateTo.map(type => (
                      <span 
                        key={`donate-${blood.type}-${type}`} 
                        className="inline-block px-3 py-1 bg-accent text-accent-700 text-sm font-medium rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Can receive from:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {blood.canReceiveFrom.map(type => (
                      <span 
                        key={`receive-${blood.type}-${type}`} 
                        className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BloodTypesInfo