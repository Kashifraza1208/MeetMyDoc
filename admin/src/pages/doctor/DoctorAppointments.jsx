import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const {
    appointments,
    isAuthenticatedDoctor,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (isAuthenticatedDoctor) {
      getAppointments();
    }
  }, [isAuthenticatedDoctor]);

  return (
    <div className=" w-full  md:ml-52 md:left-52 md:w-[calc(100%-208px)]">
      <div className="w-full md:px-14 p-5">
        <p className="mb-3 md:text-xl text-lg font-bold">All Appointments</p>
        <div className="bg-white rounded border-gray-200 border text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
          <div className="hidden sm:grid border-gray-200 grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {appointments &&
            appointments.map((appointment, index) => (
              <div
                className="flex border-gray-200 flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center py-3 px-6 text-gray-500 border-b hover:bg-gray-100"
                key={appointment._id}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 object-cover rounded-full"
                    src={appointment.userData.image}
                    alt={appointment.userData.name}
                  />
                  <p>{appointment.userData.name}</p>
                </div>
                <div>
                  <p className="text-sm inline border border-[var(--primary)] px-2 rounded-full">
                    {appointment.payment ? "Online" : "Cash"}
                  </p>
                </div>
                <p className="max-sm:hidden">
                  {calculateAge(appointment.userData.dob)}
                </p>
                <p>
                  {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
                </p>
                <p>₹ {appointment.amount}</p>

                {appointment.cancelled ? (
                  <p className="text-red-400  text-xs font-medium">Cancelled</p>
                ) : appointment.isCompleted ? (
                  <p className="text-green-400 text-xs font-medium">
                    Completed
                  </p>
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
  );
};

export default DoctorAppointments;
