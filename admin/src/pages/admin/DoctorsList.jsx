import { FaSearch } from "react-icons/fa";

import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useState } from "react";

const DoctorsList = () => {
  const {
    isAuthenticated,
    doctors,
    getAllDoctors,
    loading,
    changeAvailablity,
  } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      getAllDoctors();
    }
  }, [isAuthenticated]);

  const filteredData = doctors.filter((item) => {
    if (item) {
      const matchFilterDoctorName = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchFilterDoctorName;
    }
  });

  return (
    <div className=" w-full max-h-[90vh] overflow-y-scroll  md:ml-52 md:left-52 md:w-[calc(100%-208px)]">
      <div className="w-full md:px-14 p-5">
        <div className="md:flex-row flex-col flex items-center justify-between mb-3">
          <h1 className="text-lg md:text-xl font-bold">All Doctors</h1>
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Doctor Name"
              className="p-2 w-full focus:ring-2 focus:outline-none bg-white focus:ring-gray-400 font-normal text-black pl-10  rounded border border-gray-200"
            />
          </div>
        </div>

        {loading ? (
          Array(8)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 animate-pulse"
              >
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))
        ) : (
          <div className="grid grid-cols-auto  gap-4 gap-y-6">
            {filteredData.length > 0 &&
              filteredData.map((doctor) => (
                <div
                  key={doctor._id}
                  className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={doctor.image}
                    className="bg-indigo-50 group-hover:bg-[var(--primary)]  transition-all duration-500"
                    alt={doctor.name}
                  />
                  <div className="p-4">
                    <p className="text-neutral-800 text-lg font-medium">
                      {doctor.name}
                    </p>
                    <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <input
                        id={doctor._id}
                        type="checkbox"
                        checked={doctor.available}
                        onChange={() => changeAvailablity(doctor._id)}
                      />
                      <label htmlFor={doctor._id}>
                        <p>available</p>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
