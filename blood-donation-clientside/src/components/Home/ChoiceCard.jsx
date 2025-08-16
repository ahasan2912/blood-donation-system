import { Link } from "react-router-dom";

const ChoiceCard = ({ title, description, children }) => {
    return (
        <div className="p-8 bg-white shadow-2xl rounded-lg" data-aos="fade-up">
            <div className="text-5xl text-red-600 mb-6">
                {children}
            </div>
            <h3 className="text-2xl text-black font-semibold mb-3">{title}</h3>
            <p className="text-gray-600 mb-4 font-semibold">{description}</p>
            <Link to="/about" className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </Link>
        </div>
    );
};

export default ChoiceCard;