import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axiosInstance from "../apis/axiosInstance";
import { DoctorContext } from "../context/DoctorContext";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const doctorCtx = useContext(DoctorContext);

  const adminCtx = useContext(AdminContext);
  const isAuthenticated = adminCtx?.isAuthenticated || false;
  const setIsAuthenticated = adminCtx?.setIsAuthenticated || (() => {});

  const isAuthenticatedDoctor = doctorCtx?.isAuthenticatedDoctor || false;
  const setIsAuthenticatedDoctor =
    doctorCtx?.setIsAuthenticatedDoctor || (() => {});

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = localStorage.getItem("role");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      if (role === "Doctor") {
        const { data } = await axiosInstance.post(
          `/api/doctor/logout`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (data.success) {
          toast.success(data.message);
          localStorage.removeItem("role");
          setIsAuthenticatedDoctor(false);
          navigate("/login");
          window.scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      } else if (role === "Admin") {
        const { data } = await axiosInstance.post(
          `/api/admin/logout`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (data.success) {
          toast.success(data.message);
          localStorage.removeItem("role");
          setIsAuthenticated(false);
          navigate("/login");
          window.scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {" "}
      <div className="flex sticky top-0 left-0 z-50 right-0 justify-between items-center h-14 px-4 sm:px-10 border-gray-200 border-b bg-white">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
          </button>
          <div
            className="flex items-center justify-center cursor-pointer gap-2"
            onClick={() => navigate("/")}
          >
            <img src={assets.logo} alt="" className="h-8 w-8 object-contain" />
            <div className="flex flex-col mb-0">
              <span className="md:text-xl text-sm font-bold text-[var(--parimary)]">
                MeetMyDoc
              </span>
              <span className="text-xs">Dashboard</span>
            </div>
          </div>
          <p className="border md:px-2.5 px-2 py-0.5 md:text-sm text-xs rounded-full border-gray-200 text-gray-600">
            {isAuthenticated ? "Admin" : isAuthenticatedDoctor ? "Doctor" : ""}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[var(--primary)] text-white text-sm md:px-10 px-4 md:py-2 py-1 rounded-full"
        >
          Logout
        </button>
      </div>
      {sidebarOpen && (
        <div className="fixed block md:hidden inset-0 z-50 flex">
          <div className="w-64  bg-white shadow-xl h-full p-4">
            <Sidebar
              isMobile={true}
              closeSidebar={() => setSidebarOpen(false)}
            />
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
