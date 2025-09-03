import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { AppContext } from "../../context/AppContext";
import {
  FaStethoscope,
  FaUserInjured,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import AppointmentStatus from "../admin/AppointmentStatus";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  console.log(dashData, "data");

  const statsCards = [
    {
      icon: <RiMoneyRupeeCircleFill className="w-6 h-6 text-yellow-600" />,
      count: "₹ " + dashData.earnings,
      label: "Total Earnings",
      bgColor: "bg-yellow-100",
      iconBg: "bg-yellow-200",
    },
    {
      icon: <FaUserInjured className="w-6 h-6 text-purple-600" />,
      count: dashData.patients,
      label: "Total Patients",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-200",
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6 text-blue-600" />,
      count: dashData.appointments,
      label: "Total Appointments",
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-200",
    },
  ];

  return (
    dashData && (
      <div className=" w-full  md:ml-52 md:left-52 top-14 md:w-[calc(100%-208px)]">
        <div className="md:px-14 p-5">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-800">
              Doctor Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Overview of earnings, patients, and recent appointments.
            </p>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            pendingAppointments={dashData.pendingAppointment}
            completedAppointments={dashData.completedAppointment}
            cancelledAppointments={dashData.cancelAppointment}
          />

          {/* Latest Bookings */}
          <div className="bg-white shadow-md rounded-2xl mt-10">
            <div className="flex items-center gap-3 p-5  border-gray-200 border-b">
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
              {dashData.latestAppointments.map((appointment, index) => (
                <div
                  key={appointment._id}
                  className={`flex flex-wrap  border-gray-200 border-t border-b-0 ${
                    index === 0 ? "border border-t-0" : ""
                  }  items-center px-6 py-4 gap-4 hover:bg-gray-50 transition`}
                >
                  <img
                    className="rounded-full ring-2 ring-sky-300/20 w-12 h-12 object-cover"
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
                    <div className="flex">
                      <img
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="Cancel"
                        onClick={() => cancelAppointment(appointment._id)}
                      />
                      <img
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt="Accept"
                        onClick={() => completeAppointment(appointment._id)}
                      />
                    </div>
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

export default DoctorDashboard;
