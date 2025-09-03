import { FaCalendarAlt, FaUserMd, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-20 " id="services">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose MeetMyDoc?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare solutions with cutting-edge
            technology and experienced medical professionals.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Easy Scheduling */}
          <div className="group bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaCalendarAlt className="h-12 w-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Easy Scheduling
            </h3>
            <p className="text-gray-600 text-sm">
              Book appointments instantly with our intuitive scheduling system.
              Choose your preferred time slots with just a few clicks.
            </p>
          </div>

          {/* Expert Doctors */}
          <div className="group bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaUserMd className="h-12 w-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Expert Doctors
            </h3>
            <p className="text-gray-600 text-sm">
              Access to qualified specialists and experienced doctors across
              various medical fields and departments.
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="group bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaClock className="h-12 w-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-600 text-sm">
              Round-the-clock medical support and emergency services. We're here
              when you need us most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
