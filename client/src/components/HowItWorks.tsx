import {
  FaSearch,
  FaUserMd,
  FaCalendarCheck,
  FaCreditCard,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section id="speciality" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It <span className="text-blue-600"> Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Booking an appointment with MeetMyDoc is simple and convenient. Just
            follow these quick steps.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 - Browse Doctors */}
          <div className="group bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaUserMd className="h-12 w-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Browse Doctors
            </h3>
            <p className="text-gray-600 text-sm">
              Explore our doctors section to view specialists by category and
              expertise.
            </p>
          </div>

          {/* Step 2 - Choose Specialist */}
          <div className="group bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaUserMd className="h-12 w-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Choose Specialist
            </h3>
            <p className="text-gray-600 text-sm">
              Browse profiles and select the right specialist for your needs.
            </p>
          </div>

          {/* Step 3 - Book Appointment */}
          <div className="group bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaCalendarCheck className="h-12 w-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Book Appointment
            </h3>
            <p className="text-gray-600 text-sm">
              Select your preferred time slot and confirm your appointment.
            </p>
          </div>

          {/* Step 4 - Pay Online */}
          <div className="group bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <FaCreditCard className="h-12 w-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Pay Online
            </h3>
            <p className="text-gray-600 text-sm">
              Securely pay consultation fees via Razorpay for a hassle-free
              experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
