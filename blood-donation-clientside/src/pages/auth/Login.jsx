import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    const [showPassword, setShowPassword] = useState('');
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginWithGoogle, userSignInEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        }
        try {
            await userSignInEmail(userInfo.email, userInfo.password)
            toast.success('Login successfully!');
            navigate(from, { replace: true });
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    // hadleGoogleLogin 
    const hadleGoogleLogin = async () => {

        try {
            const result = await loginWithGoogle();
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
                image: result.user?.photoURL
            };
            // data save in server
            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                toast.success('Login successfully!');
            }
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Application title
    useEffect(() => {
        document.title = "Login | Blood Donation Application";
    }, []);

    // motion framer
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">
                            Sign in to your BloodDonor account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <div className="form-control mb-4">
                            <label htmlFor="email" className="form-label text-black">
                                Email
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="email"
                                    type="email"
                                    className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black`}
                                    placeholder="johndoe123@gmail.com"
                                    {...register("email", { required: true })}
                                />
                                <span>{errors.email && <span className='text-red-500'>Email is required</span>}</span>
                            </div>
                        </div>
                        <div className="form-control mb-4">
                            <label htmlFor="name" className="form-label text-black">
                                Password
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input type={showPassword ? 'text' : 'password'}  {...register("password", {
                                    required: true,
                                })} name="password" placeholder=".............." className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-2xl placeholder:absolute placeholder:-top-[3px] text-black" required />

                                <span>{errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}</span>
                                <button type='button' onClick={() => setShowPassword(!showPassword)} className='btn btn-xs bg-white absolute top-[10px] right-2 hover:bg-gray-300 border-0 outline-0 text-black z-20'>
                                    {
                                        showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />
                                    }
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn text-base w-full py-6 bg-red-500 text-white border-0"
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="divider divider-default my-4 text-gray-600">OR</div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={hadleGoogleLogin}
                            className="btn py-6 text-base w-full bg-red-500 text-white border-0">With Google</button>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't Have an account?{' '}
                            <Link to="/register" className="font-medium text-red-600 hover:text-red-400">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;