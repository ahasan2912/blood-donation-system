import { FaSearch } from "react-icons/fa";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='bg-red-500 py-14 px-1'>
            <h1 className="text-5xl font-bold text-center text-white">Blood Donors Directory</h1>
            <p className="text-center text-lg max-w-3xl mx-auto my-5 text-gray-200">
                Find compatible blood donors in your area. Contact available donors directly for urgent needs.
            </p>
            <div className="mb-8">
                <div className="relative max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Search by name or city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-lg text-white"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-100" />
                </div>
            </div>
        </div>
    );
};

export default SearchBox;