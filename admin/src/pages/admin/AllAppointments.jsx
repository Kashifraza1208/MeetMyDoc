import { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import AppointmentLoading from "../../components/AppointmentLoading";
import PaginationPage from "../../components/PaginationPage";
import useDebounce from "../../hooks/useDebounce";

const AllAppointments = () => {
  const {
    getAllAppointments,
    isAuthenticated,
    appointments,
    cancelAppointment,
    loadingAppointment,
    appointmentPage,
    setAppointmentPage,
    appointmentTotalPage,
    appointmentSearch,
    setAppointmentSearch,
  } = useContext(AdminContext);

  const { calculateAge, slotDateFormat } = useContext(AppContext);

  const debouncedSearch = useDebounce(appointmentSearch, 500);

  useEffect(() => {
    if (isAuthenticated) {
      getAllAppointments();
    }
  }, [isAuthenticated, appointmentPage, debouncedSearch]);

  return (
    <div className={`w-full  md:ml-52 md:left-52 md:w-[calc(100%-208px)]`}>
      <div className={`w-full md:px-14 p-5`}>
        <div className="md:flex-row flex-col flex items-center justify-between mb-3">
          <p className="md:text-xl text-lg font-bold">All Appointments</p>
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={appointmentSearch}
              onChange={(e) => setAppointmentSearch(e.target.value)}
              placeholder="Search by Patient or Doctor"
              className="p-2 w-full focus:ring-2 focus:outline-none bg-white focus:ring-gray-400 font-normal text-black pl-10  rounded border border-gray-200"
            />
          </div>
        </div>

        {loadingAppointment ? (
          <AppointmentLoading />
        ) : (
          <>
            <div className="bg-white rounded border-gray-200 border text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
              <div className="hidden sm:grid border-gray-200 grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
                <p>#</p>
                <p>Patient</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Doctor</p>
                <p>Fees</p>
                <p>Actions</p>
              </div>

              {appointments.length > 0 &&
                appointments.map((appointment, index) => (
                  <div
                    className="flex border-gray-200 flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                    key={appointment._id}
                  >
                    <p className="max-sm:hidden">{index + 1}</p>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 h-8 object-cover rounded-full bg-gray-200"
                        src={appointment.userData.image}
                        alt={appointment.userData.name}
                      />
                      <p>{appointment.userData.name}</p>
                    </div>
                    <p className="max-sm:hidden">
                      {calculateAge(appointment.userData.dob)}
                    </p>
                    <p>
                      {slotDateFormat(appointment.slotDate)},{" "}
                      {appointment.slotTime}
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 rounded-full bg-gray-200"
                        src={appointment.docData.image}
                        alt={appointment.docData.name}
                      />
                      <p>{appointment.docData.name}</p>
                    </div>
                    <p>₹{appointment.amount}</p>
                    <>
                      {appointment.cancelled ? (
                        <p className="text-red-400 text-xs font-medium">
                          Cancelled
                        </p>
                      ) : appointment.isCompleted ? (
                        <p className="text-green-400 text-xs font-medium">
                          Completed
                        </p>
                      ) : (
                        <p>
                          <img
                            className="w-10 cursor-pointer"
                            src={assets.cancel_icon}
                            alt="cancel"
                            onClick={() => cancelAppointment(appointment._id)}
                          />
                        </p>
                      )}
                    </>
                  </div>
                ))}
            </div>
            <div className="flex border border-gray-100 items-center justify-between w-full bg-gray-50 p-2 mt-10">
              <div>
                <span className="text-sm font-semibold text-black">
                  Page {appointmentPage} of {appointmentTotalPage}
                </span>
              </div>
              <PaginationPage
                setPage={setAppointmentPage}
                totalPage={appointmentTotalPage}
              />
              <div></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
