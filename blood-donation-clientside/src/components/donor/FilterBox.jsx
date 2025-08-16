import { motion } from 'framer-motion'

const FilterBox = ({ filters, setFilters }) => {
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleBloodTypeChange = (type) => {
    if (filters.bloodTypes.includes(type)) {
      setFilters({
        ...filters,
        bloodTypes: filters.bloodTypes.filter(t => t !== type)
      })
    } else {
      setFilters({
        ...filters,
        bloodTypes: [...filters.bloodTypes, type]
      })
    }
  }

  const handleAvailabilityChange = (e) => {
    setFilters({
      ...filters,
      onlyAvailable: e.target.checked
    })
  }

  const handleCityChange = (e) => {
    setFilters({
      ...filters,
      subDistrict: e.target.value,
      district: e.target.value,
      division: e.target.value
    })
  }

  const clearFilters = () => {
    setFilters({
      bloodTypes: [],
      subDistrict: '',
      district: '',
      division: '',
      onlyAvailable: false
    })
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 border border-red-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800">Filter Donors</h3>
      <div className="space-y-4">
        <div>
          <label className="font-medium text-gray-700 block mb-2">Blood Type</label>
          <div className="flex flex-wrap gap-2">
            {bloodTypes.map(type => (
              <button
                key={type}
                onClick={() => handleBloodTypeChange(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filters.bloodTypes.includes(type)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700 block mb-2">Location</label>
          <input
            type="text"
            value={filters.subDistrict}
            onChange={handleCityChange}
            placeholder="Filter by city"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="available"
            checked={filters.onlyAvailable}
            onChange={handleAvailabilityChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="available" className="ml-2 block text-gray-700">
            Show only available donors
          </label>
        </div>
        <button
          onClick={clearFilters}
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          Clear all filters
        </button>
      </div>
    </motion.div>
  )
}

export default FilterBox