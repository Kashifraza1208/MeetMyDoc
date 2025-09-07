import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import AppointmentLoading from "../../components/AppointmentLoading";

const PatientList = () => {
  const {
    getAllPatients,
    isAuthenticated,
    users,
    cancelAppointment,
    loadingUsers,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const { calculateAge } = useContext(AppContext);

  console.log(users, "suer");

  useEffect(() => {
    if (isAuthenticated) {
      getAllPatients();
    }
  }, [isAuthenticated]);

  const filteredData = users.filter((item) => {
    if (item) {
      const matchPatient = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchDoctor = item.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchPatient || matchDoctor;
    }
    return false;
  });

  if (loadingUsers) {
    return <AppointmentLoading />;
  }

  return (
    <div className=" w-full  md:ml-52 md:left-52 md:w-[calc(100%-208px)]">
      <div className="w-full md:px-14 p-5">
        <div className="md:flex-row flex-col flex items-center justify-between mb-3">
          <p className="md:text-xl text-lg font-bold">All Patients</p>
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Patient or Doctor"
              className="p-2 w-full focus:ring-2 focus:outline-none bg-white focus:ring-gray-400 font-normal text-black pl-10  rounded border border-gray-200"
            />
          </div>
        </div>
        <div className="bg-white rounded border-gray-200 border text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
          <div className="hidden sm:grid border-gray-200 grid-cols-[0.5fr_3fr_3fr_1fr_2fr_1fr_3fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Email</p>
            <p>DOB</p>
            <p>Phone</p>
            <p>Gender</p>
            <p>Address</p>
            <p>Actions</p>
          </div>

          {filteredData.map((appointment, index) => (
            <div
              className="flex border-gray-200 flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_1fr_2fr_1fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={appointment._id}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 object-cover rounded-full bg-gray-200"
                  src={appointment.image}
                  alt={appointment.name}
                />
                <p>{appointment.name}</p>
              </div>
              <p>{appointment.email}</p>
              <p className="max-sm:hidden">{calculateAge(appointment.dob)}</p>
              <p>{appointment.phone}</p>
              <p>{appointment.gender}</p>
              <p>
                {appointment.address.line1} + {appointment.address.line2}
              </p>

              <>
                {appointment.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
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
      </div>
    </div>
  );
};

export default PatientList;
