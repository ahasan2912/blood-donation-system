import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/shared/NotFoundPage";
import Dashboard from "../layout/Dashboard";
import MainLayout from "../layout/MainLayout";
import AboutUs from "../pages/about/AboutUs";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Blogs from "../pages/blogs/Blogs";
import ContactInfo from "../pages/contact/ContactInfo";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import RecepientMange from "../pages/dashboard/admin/RecepientMange";
import UserManage from "../pages/dashboard/admin/UserManage";
import DonorRegistration from "../pages/donors/DonorRegistration";
import Donors from "../pages/donors/Donors";
import Home from "../pages/home/Home";
import BloodRequestForm from "../pages/requestForm/BloodRequestForm";
import PrivetRoute from "./PrivetRoute";
import DonorHome from "../pages/dashboard/donor/DonorHome";
import DonationRequestList from "../pages/dashboard/donor/DonationRequestList";
import DonationHistory from "../pages/dashboard/donor/DonationHistory";
import RecepientHome from "../pages/dashboard/recepient/RecepientHome";
import MyRequest from "../pages/dashboard/recepient/MyRequest";
import AvailableDonors from "../pages/dashboard/recepient/AvailableDonors";
import DonorsManage from "../pages/dashboard/admin/DonorsManage";
import AllDonorBooked from "../pages/dashboard/recepient/AllDonorBooked";
import HospitalRequestForm from "../pages/hospitalRequest/HospitalRequestForm";
import HospitalManage from "../pages/dashboard/admin/HospitalManage";
import MangeAllDonor from "../pages/dashboard/hospital/AvailableDonor";
import HospitalDonationReq from "../pages/dashboard/donor/HospitalDonationReq";
import Profile from "../pages/dashboard/profile/Profile";
import UpdatedProfile from "../pages/dashboard/profile/UpdatedProfile";
import ForgettenPassword from "../pages/dashboard/profile/ForgettenPassword";
import History from "../pages/dashboard/hospital/History";
import HospitalHome from "../pages/dashboard/hospital/HospitalHome";
import AllBookedDonor from "../pages/dashboard/hospital/AllBookedDonor";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/blood-request-from",
        element: <PrivetRoute><BloodRequestForm /></PrivetRoute>
      },
      {
        path: "/blood-donate-registration",
        element: <PrivetRoute><DonorRegistration /></PrivetRoute>
      },
      {
        path: "/hospital-registration",
        element: <PrivetRoute><HospitalRequestForm /></PrivetRoute>
      },
      {
        path: "/donors",
        element: <Donors />
      },
      {
        path: "/about",
        element: <AboutUs />
      },
      {
        path: "/blogs",
        element: <Blogs />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/contact",
        element: <ContactInfo />
      },
    ]
  },
  /* Dashboard */
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      /* Admin Items */
      {
        path: 'adminHome',
        element: <AdminHome />
      },
      {
        path: 'manageUser',
        element: <UserManage />
      },
      {
        path: 'manageHospital',
        element: <HospitalManage />
      },
      {
        path: 'manageDonar',
        element: <DonorsManage />
      },
      {
        path: 'manageRecepient',
        element: <RecepientMange />
      },
      /* Donor Item */
      {
        path: 'donorHome',
        element: <DonorHome />
      },
      {
        path: 'donationRequestsList',
        element: <DonationRequestList />
      },
      {
        path: 'donationHistory',
        element: <DonationHistory />
      },
      /* Recepient Item */
      {
        path: 'recepientHome',
        element: < RecepientHome />
      },
      {
        path: 'my-requests',
        element: < MyRequest />
      },
      {
        path: 'available-donors',
        element: < AvailableDonors />
      },
      {
        path: 'allBookedDonor',
        element: < AllDonorBooked />
      },
      /* hospital role */
      {
        path: 'hospitalHome',
        element: < HospitalHome />
      },
      {
        path: 'hospitalRecipentHistory',
        element: <History></History>
      },
      {
        path: 'hospitalManageDonor',
        element: < MangeAllDonor />
      },
      {
        path: 'hospitalBookedDonor',
        element: < AllBookedDonor />
      },
      {
        path: 'hospitalDonation',
        element: <HospitalDonationReq />
      },

      /* Update Profile */
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'updateprofile',
        element: <UpdatedProfile />
      },
      {
        path: 'forgetpassword',
        element: <ForgettenPassword />
      },
    ]
  }
]);
