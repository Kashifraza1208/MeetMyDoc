import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDocs, setRelDocs] = useState([]);

  const fetchRelatedDoctor = () => {
    const doctorsData = doctors.filter(
      (doctor) => doctor._id !== docId && doctor.speciality === speciality
    );

    setRelDocs(doctorsData);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (doctors && speciality) {
      fetchRelatedDoctor();
    }
  }, [docId, speciality, doctors]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          Related Doctors
        </h1>
        <p className="mt-2 text-gray-600 text-sm sm:w-1/2 mx-auto">
          Simply browse through our extensive list of trusted doctors to find
          the right one for you.
        </p>
      </div>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDocs.map((doctor, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img src={doctor.image} alt={doctor.name} className="bg-blue-50" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  doctor.available ? "bg-green-500" : "bg-gray-500"
                }}`}
              >
                <p
                  className={`${
                    doctor.available ? "bg-green-500" : "bg-gray-500"
                  } rounded-full w-2 h-2`}
                ></p>
                <p>{doctor.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
              <p className="text-gray-600 text-sm">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more...
      </button>
    </div>
  );
};

export default RelatedDoctors;
