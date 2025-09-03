import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import AppointmentStatus from "./AppointmentStatus";

const Dashboard = () => {
  const {
    aToken,
    getDashboardData,
    dashData,
    cancelAppointment,
    appointments,
  } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken, appointments]);

  const statsCards = [
    {
      icon: <FaStethoscope className="w-6 h-6 text-green-600" />,
      count: dashData.activeDoctors,
      label: "Active Doctors",
      bgColor: "bg-green-100",
      iconBg: "bg-green-200",
    },
    {
      icon: <FaStethoscope className="w-6 h-6 text-red-600" />,
      count: dashData.inactiveDoctors,
      label: "Inactive Doctors",
      bgColor: "bg-red-100",
      iconBg: "bg-red-200",
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6 text-blue-600" />,
      count: dashData.appointments,
      label: "Total Appointments",
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-200",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-indigo-600" />,
      count: dashData.patients,
      label: "Registered Patients",
      bgColor: "bg-indigo-100",
      iconBg: "bg-indigo-200",
    },
  ];
  return (
    dashData && (
      <div className=" w-full  md:ml-52 md:left-52 top-14 md:w-[calc(100%-208px)]">
        <div className="md:px-14 p-5">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Overview of doctors, patients, and recent appointments.
            </p>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 ${stat.bgColor} shadow-sm hover:shadow-md rounded-xl p-6 transition-transform hover:-translate-y-1 cursor-pointer`}
              >
                {/* Icon container */}
                <div
                  className={`p-3 rounded-full ${stat.iconBg} flex items-center justify-center`}
                >
                  {stat.icon}
                </div>

                {/* Text content */}
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.count}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <AppointmentStatus
            pendingAppointments={3}
            completedAppointments={5}
            cancelledAppointments={7}
          />

          {/* Latest Bookings */}
          <div className="bg-white shadow-md rounded-2xl mt-10">
            <div className="flex items-center gap-3 p-5 border-b">
              <img
                src={assets.list_icon}
                alt="Latest Bookings"
                className="w-6 h-6"
              />
              <p className="font-semibold text-gray-700 text-lg">
                Latest Bookings
              </p>
            </div>

            <div className="divide-y">
              {dashData.latestAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex flex-wrap items-center px-6 py-4 gap-4 hover:bg-gray-50 transition"
                >
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src={appointment.docData.image}
                    alt={appointment.docData.name}
                  />
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      {appointment.docData.name}
                    </p>
                    <p className="text-sm opacity-90">
                      {slotDateFormat(appointment.slotDate)}
                    </p>
                  </div>
                  {appointment.cancelled ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      Cancelled
                    </span>
                  ) : appointment.isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                      Completed
                    </span>
                  ) : (
                    <img
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      onClick={() => cancelAppointment(appointment._id)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
