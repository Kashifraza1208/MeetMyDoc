import { useNavigate } from "react-router-dom";

import { CiStethoscope } from "react-icons/ci";

import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");

    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex sticky top-0 left-0 z-50 right-0 justify-between items-center h-14 px-4 sm:px-10  border-gray-200 border-b bg-white">
      <div className="flex items-center gap-2 text-xs ">
        <div
          className="flex items-center justify-center cursor-pointer gap-2"
          onClick={() => navigate("/")}
        >
          <CiStethoscope className="md:h-10 md:w-10 h-7 w-7 text-[var(--parimary)] font-bold" />
          <div className="flex flex-col mb-0">
            <span className="md:text-xl text-lg font-bold text-[var(--parimary)]">
              MeetMyDoc
            </span>
            <span className="text-xs">Dashboard Panel</span>
          </div>
        </div>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-200 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-[var(--primary)] text-white text-sm md:px-10 px-5 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
