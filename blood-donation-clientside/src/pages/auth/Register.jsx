import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoMdPhotos } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';

// image related variable
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState('');
    const { setUser, createUser, loginWithGoogle, updateUserProfile, handleLogOut, } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        // image upload to imgbb and then get url
        const imageFile = { image: data.photo[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const photoURL = res.data.data.display_url;
        const userInfo = {
            name: data.name,
            photo: photoURL,
            email: data.email,
        }
        try {
            const result = await createUser(userInfo.email, data.password)
            await updateUserProfile(userInfo.name, userInfo.photo)
            setUser({ ...result.user, photoURL: userInfo.photo, displayName: userInfo.name });

            // data save in server
            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                toast.success("You have successfully registered");
            }
            //logout
            handleLogOut();
            navigate("/login")
        }
        catch (err) {
            toast.error(err?.message || "Registration failed");
            console.error(err);
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
        document.title = "Register | Blood Donation Application";
    }, []);

    // motion.js
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            x: -50,
            transition: { duration: 0.3 }
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
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                        <p className="text-gray-600">
                            Join our blood donor community
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <motion.div
                            className="space-y-6"
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="form-control mb-4">
                                <label htmlFor="name" className="text-gray-700 flex items-center gap-1">
                                    <span>Full Name</span>
                                    <span className="text-red-500 text-base font-semibold"> *</span>
                                </label>
                                <div className="relative mt-1">
                                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-600`}
                                        placeholder="John Doe"
                                        {...register("name", { required: true })}
                                    />
                                    <span>{errors.name && <span className='text-red-500'>Name is required</span>}</span>
                                </div>
                            </div>
                            <div className="form-control mb-4">
                                <label htmlFor="photo" className="text-gray-700 flex items-center gap-1">
                                    <span>Upload Photo</span>
                                    <span className="text-red-500 text-base font-semibold"> *</span>
                                </label>
                                <div className="relative mt-1">
                                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                                        <IoMdPhotos className="text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        id="photo"
                                        name="photo"
                                        type="file"
                                        className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-600`}
                                        placeholder="Upload your photo"
                                        {...register("photo", { required: true })}
                                    />
                                    <span>{errors.photo && <span className='text-red-500'>Photo is required</span>}</span>
                                </div>
                            </div>
                            <div className="form-control mb-4">
                                <label htmlFor="email" className="text-gray-700 flex items-center gap-1">
                                    <span>Email</span>
                                    <span className="text-red-500 text-base font-semibold"> *</span>
                                </label>
                                <div className="relative mt-1">
                                    <div className="absolute top-3.5 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-600`}
                                        placeholder="johndoe123@gmail.com"
                                        {...register("email", { required: true })}
                                    />
                                    <span>{errors.email && <span className='text-red-500'>Email is required</span>}</span>
                                </div>
                            </div>
                            <div className="form-control mb-4">
                                <label htmlFor="password" className="text-gray-700 flex items-center gap-1">
                                    <span>Password</span>
                                    <span className="text-red-500 text-base font-semibold"> *</span>
                                </label>
                                <div className="relative mt-1">
                                    <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input type={showPassword ? 'text' : 'password'}
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 15,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*%])(?=.*[0-9])(?=.*[a-z])/
                                        })} id='password' name="password" placeholder=".............." className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-2xl placeholder:absolute placeholder:-top-[3px] text-gray-600" required />
                                    {/* ✅ Error messages */}
                                    {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be at least 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 15 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must include uppercase, lowercase, number, and special character (!@#$&*)</p>}
                                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute top-[10px] right-2 hover:bg-gray-300 border-0 outline-0 bg-white text-black z-20'>
                                        {
                                            showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />
                                        }
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn w-full text-base py-6 bg-red-500 text-white border-0"
                            >
                                Sing Up
                            </button>
                        </motion.div>
                    </form>
                    <div className="divider divider-default my-4 text-gred-600">OR</div>
                    <motion.div
                        className="space-y-6"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex justify-center space-x-4">
                            <button
                                type="submit"
                                onClick={hadleGoogleLogin}
                                className="btn py-6 w-full bg-red-500 text-base text-white border-0">With Google</button>
                        </div>
                    </motion.div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-red-600 hover:text-red-400">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default Register;