import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = ({ closeSidebar, isMobile = false }) => {
  const doctorCtx = useContext(DoctorContext);
  console.log("object");
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
    { to: "/patient-list", label: "Patient List", icon: assets.people_icon },
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
    <div
      className={`h-[calc(100vh-56px)] bg-white border-r border-gray-200 flex flex-col 
      ${
        isMobile
          ? "fixed top-0 left-0 w-64 z-50"
          : "hidden md:flex fixed top-14 bottom-0 w-56"
      }`}
    >
      <ul className="flex flex-col gap-2 py-6 m-3">
        {activeLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 px-4 rounded-xl transition-all 
              ${
                isActive
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[var(--primary)]"
              }`
            }
          >
            <img src={link.icon} alt={link.label} className="w-5 h-5" />
            <p className="font-medium">{link.label}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
