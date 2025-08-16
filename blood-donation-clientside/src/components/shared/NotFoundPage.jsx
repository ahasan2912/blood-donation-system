import { Link } from 'react-router-dom';
import { FaTint } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700">
            <FaTint className="text-6xl mb-4 animate-bounce" />
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-2">Oops! Page not found.</p>
            <p className="mt-1 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="mt-6 inline-block px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition duration-300"
            >
                🔙 Go Back Home
            </Link>
        </div>
    );
};

export default NotFoundPage;