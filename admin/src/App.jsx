import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import { useContext } from "react";

import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AllAppointments from "./pages/admin/AllAppointments.jsx";
import AddDoctor from "./pages/admin/AddDoctor.jsx";
import DoctorsList from "./pages/admin/DoctorsList.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import DoctorProfile from "./pages/doctor/DoctorProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PatientList from "./pages/admin/PatientList.jsx";

const App = () => {
  const adminCtx = useContext(AdminContext);
  const doctorCtx = useContext(DoctorContext);

  const isAuthenticated = adminCtx?.isAuthenticated || false;
  const loadingAuth = adminCtx?.loadingAuth || false;
  const loadingDoctor = doctorCtx?.loadingDoctor || false;
  const isAuthenticatedDoctor = doctorCtx?.isAuthenticatedDoctor || false;

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

  return (
    <>
      {isAuthenticated || isAuthenticatedDoctor ? (
        <div className="bg-[#f8f9fd]">
          <Navbar />

          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/" element={<></>} />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/all-appointments"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AllAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-doctor"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AddDoctor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor-list"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <DoctorsList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/patient-list"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <PatientList />
                  </ProtectedRoute>
                }
              />

              {/* Doctor route */}
              <Route
                path="/doctor-appointments"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticatedDoctor}>
                    {" "}
                    <DoctorAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor-profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticatedDoctor}>
                    <DoctorProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/doctor-dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticatedDoctor}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}

      <ToastContainer />
    </>
  );
};

export default App;
