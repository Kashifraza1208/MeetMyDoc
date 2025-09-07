import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  const adminCtx = useContext(AdminContext);
  const doctorCtx = useContext(DoctorContext);

  const loadingAuth = adminCtx?.loadingAuth ?? false;
  const loadingDoctor = doctorCtx?.loadingDoctor ?? false;

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (loadingDoctor) {
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
