import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const doctorCtx = useContext(DoctorContext);

  const adminCtx = useContext(AdminContext);

  const isAuthenticated = adminCtx?.isAuthenticated || false;
  const isAuthenticatedDoctor = doctorCtx?.isAuthenticatedDoctor || false;

  const linksAdmin = [
    { to: "/admin-dashboard", label: "Dashboard", icon: assets.home_icon },
    {
      to: "/all-appointments",
      label: "Appointments",
      icon: assets.appointment_icon,
    },
    { to: "/add-doctor", label: "Add Doctor", icon: assets.add_icon },
    { to: "/doctor-list", label: "Doctors List", icon: assets.people_icon },
  ];

  const linksDoctor = [
    { to: "/doctor-dashboard", label: "Dashboard", icon: assets.home_icon },
    {
      to: "/doctor-appointments",
      label: "Appointments",
      icon: assets.appointment_icon,
    },
    { to: "/doctor-profile", label: "Profile", icon: assets.people_icon },
  ];

  const activeLinks = isAuthenticated
    ? linksAdmin
    : isAuthenticatedDoctor
    ? linksDoctor
    : [];

  return (
    <div className="h-[calc(100vh-56px)] fixed top-14 bottom-0 bg-white border-r border-gray-200  flex flex-col">
      <div className="flex items-center md:m-3">
        <ul className="flex flex-col md:gap-2 py-6">
          {activeLinks.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-start ps-3  md:w-52 gap-4 py-3 w-0 rounded-xl transition-all duration-300 
                ${
                  isActive
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[var(--primary)]"
                }`
              }
            >
              <img
                src={link.icon}
                alt={link.label}
                className={`w-5 h-5 ${
                  link.label === "Dashboard" ? "invert-0" : ""
                }`}
              />
              <p className="hidden md:block font-medium">{link.label}</p>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
