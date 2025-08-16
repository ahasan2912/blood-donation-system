import { FaSearch } from 'react-icons/fa';

const SearchBox = ({searchTerm, handleSearchChange, redText, blackText, placeholder}) => {
    return (
        <div className='mb-8 flex flex-col md:flex-row justify-between items-center pb-6 border-b-2 border-red-100'>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-0">
                <span className="text-red-600">{redText} </span>{blackText}
            </h2>
            {/* Search Input Box */}
            <div className="relative w-full md:w-1/3 max-w-md">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-full border border-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
        </div>
    );
};

export default SearchBox;