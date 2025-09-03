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

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#f8f9fd]">
      <Navbar />
      <ToastContainer />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
