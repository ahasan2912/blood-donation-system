import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import coverImg from '../../../assets/Banner/blood-donation.jpg'
import { Link } from 'react-router-dom';
import BloodLoadingSpinner from '../../../components/shared/BloodLoadingSpinner';

const Profile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();

    if(isLoading && loading) {
        return <BloodLoadingSpinner/>
    }

    return (
        <div className='flex justify-center items-center '>
            <div className='w-full shadow-lg rounded-2xl'>
                <img
                    alt='cover photo'
                    src={coverImg}
                    className='w-full rounded-t-lg h-60'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-32 w-32  border-2 border-white '
                        />
                    </a>

                    <p className='py-1 px-6 text-base text-white bg-red-600 rounded-full'>
                        {role}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col font-bold'>
                                Name
                                <span className='text-base font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col font-bold'>
                                Email
                                <span className='text-base font-bold text-black '>{user?.email}</span>
                            </p>

                            <div>
                                <Link to="/dashboard/updateprofile">
                                    <button className='btn btn-base bg-red-500 hover:bg-red-600 px-10 py-2 rounded-lg text-white cursor-pointer block mb-1 hover:text-gray-300'>
                                        Update Profile
                                    </button>
                                </Link>
                                <Link to='/dashboard/forgetpassword'>
                                    <button className='btn btn-base bg-red-500 hover:bg-red-600 px-7 py-2 rounded-lg text-white cursor-pointer'>
                                        Change Password
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;