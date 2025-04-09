import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/actions/handleAuthentication.tsx"

const ProtectedRoute = ({ children }) => {
    console.log('Auth check result:', isAuthenticated());
    if (!isAuthenticated()) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;