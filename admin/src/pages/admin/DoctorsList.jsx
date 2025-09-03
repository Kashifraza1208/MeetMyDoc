import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, loading, changeAvailablity } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className=" w-full max-h-[90vh] overflow-y-scroll  md:ml-52 md:left-52 md:w-[calc(100%-208px)]">
      <div className="w-full md:px-14 p-5">
        <div className=" ">
          <h1 className="text-lg md:text-xl font-bold">All Doctors</h1>
          {loading ? (
            <div className="flex items-center ">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-auto  gap-4 pt-5 gap-y-6">
              {doctors.map((doctor) => (
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
    </div>
  );
};

export default DoctorsList;
