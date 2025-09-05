import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Contact <span className="text-blue-600">Us</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Have questions or need support? We’d love to hear from you. Get in
          touch with our team today.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        {/* Image */}
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-lg"
          src={assets.contact_image}
          alt="Contact Us"
        />

        {/* Details */}
        <div className="flex flex-col gap-6 text-sm md:text-base text-gray-600">
          {/* Office Info */}
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Our Office
            </h3>
            <p>
              Fitness Club Sehatpur <br /> Faridabad, Haryana, India
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Get in Touch
            </h3>
            <p>
              Tel:{" "}
              <span className="font-medium text-gray-700">(000) 000-0000</span>
              <br />
              Email:{" "}
              <a
                href="mailto:kashifrazasonbarsa@gmail.com"
                className="text-blue-600 hover:underline"
              >
                kashifrazasonbarsa@gmail.com
              </a>
            </p>
          </div>

          {/* Careers */}
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Careers at MeetMyDoc
            </h3>
            <p className="mb-4">
              Learn more about our team, culture, and current job openings.
            </p>
            <button className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
