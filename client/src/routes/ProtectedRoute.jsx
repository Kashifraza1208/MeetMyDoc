import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ loadingUser, isAuthenticated, children }) => {
  const location = useLocation();

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
