import { Navigate, useLocation } from "react-router-dom";
import BloodLoadingSpinner from "../components/shared/BloodLoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <BloodLoadingSpinner />
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
};

export default PrivetRoute;