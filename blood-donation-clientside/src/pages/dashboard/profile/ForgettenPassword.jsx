import { useRef } from 'react';
import image from '../../../assets/firebase.png'
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../../firebase/firebase.init';


const ForgettenPassword = () => {
    const emailRef = useRef();

    const handleLoginBtn = (e) => {
        e.preventDefault();
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.error('Please Provide a valid a email address');
        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.success('Password Reset, please check your email');
                })
        }
    }
    return (
        <div className=" flex items-center justify-center min-h-screen gap-10 bg-gray-100 px-4 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                    <img
                        src={image}
                        alt="Freshworks Logo"
                        className="h-10 w-[70%] mx-auto"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                    Forgot Your Password?
                </h2>
                <p className="text-gray-600 text-sm text-center mb-4">
                    Please enter your email address to receive a password reset link.
                </p>
                <form onSubmit={handleLoginBtn}>
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Enter Email Address
                    </label>
                    <input
                        ref={emailRef}
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full p-3 border border-red-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
                        required
                    />
                    <button
                        onClick={handleForgetPassword}
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Password Reset
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="/" className="text-red-500 hover:underline text-sm">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgettenPassword;