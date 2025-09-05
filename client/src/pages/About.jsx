import React from "react";
import { assets } from "../assets/assets";
import WhyChooseUs from "../components/WhyChooseUs";

const About = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      {/* About Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          About <span className="text-blue-600">Us</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          MeetMyDoc is your trusted partner in managing healthcare needs,
          bridging the gap between patients and doctors with a seamless,
          technology-driven experience.
        </p>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        {/* Image */}
        <img
          src={assets.about_image}
          alt="About MeetMyDoc"
          className="w-full md:max-w-[380px] rounded-xl shadow-lg"
        />

        {/* Text */}
        <div className="flex flex-col gap-6 text-gray-600 text-sm md:text-base leading-relaxed md:w-1/2">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-gray-800">MeetMyDoc</span>, your
            reliable healthcare companion. We understand the challenges of
            booking appointments and managing health records, so we built a
            platform that simplifies these processes for patients, doctors, and
            admins alike.
          </p>
          <p>
            Our platform is designed with efficiency and care in mind, ensuring
            smooth scheduling, secure data handling, and easy access to trusted
            medical professionals. From your first consultation to ongoing care,
            MeetMyDoc supports you at every step.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p>
              To create a healthcare ecosystem where every patient has quick,
              reliable, and affordable access to doctors. We aim to remove
              barriers in healthcare access by leveraging modern technology and
              innovation.
            </p>
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </section>
  );
};

export default About;
