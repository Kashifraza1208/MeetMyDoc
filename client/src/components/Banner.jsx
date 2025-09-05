import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="pt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Take Care of Your{" "}
            <span className="text-blue-600"> Health </span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust MeetMyDoc for their
            healthcare needs.
          </p>
        </div>
      </section>
      <div className="flex bg-[var(--primary)] rounded-lg px-6 sm:px-10 md:px-14 lg-px-12 my-10 md:mx-10">
        {/* Left Side */}
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Book Appointment</p>
            <p className="mt-4">With 100+ Trusted Doctors</p>
          </div>
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          >
            Create account
          </button>
        </div>

        {/* Right Side */}
        <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
          <img
            className="w-full absolute bottom-0 right-0 max-w-md"
            src={assets.appointment_img}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
