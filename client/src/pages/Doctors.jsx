import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors, loading } = useContext(AppContext);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const specialities = [
    "Gynecologist",
    "General Physician",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Browse Doctors
        </h2>
        <p className="text-gray-600 mt-2">
          Choose a specialist and book your appointment instantly.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className={`py-1 px-3 rounded tex-sm border transition-all 
                sm:hidden ${
                  showFilters ? "bg-[var(--primary)] text-white" : ""
                }`}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 
                      ${showFilters ? "flex" : "hidden sm:flex"}`}
        >
          {specialities.map((spec, idx) => (
            <button
              key={idx}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`px-4 py-2 rounded-full border text-gray-700 transition ${
                speciality === spec
                  ? "bg-blue-100 border-blue-400 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {loading
            ? Array(8)
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
            : filterDoc.length > 0 &&
              filterDoc.map((doctor, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="bg-blue-50"
                  />
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
                    <p className="text-gray-900 text-lg font-medium">
                      {doctor.name}
                    </p>
                    <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
