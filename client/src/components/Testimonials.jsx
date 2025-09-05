import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient, USA",
      content:
        "Excellent service and professional doctors. The online booking system made everything so convenient!",
      rating: 5,
    },
    {
      name: "Rohit Sharma",
      role: "Patient, India",
      content:
        "I had a smooth experience with MeetMyDoc. Booking was easy and the doctors provided excellent care.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Patient, UK",
      content:
        "Best healthcare experience I've had. Highly recommend MeetMyDoc for quality medical services.",
      rating: 5,
    },
    {
      name: "Priya Nair",
      role: "Patient, India",
      content:
        "The doctors were very supportive and the staff was extremely helpful throughout my treatment.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Patient, Singapore",
      content:
        "Quick appointments, great care. The doctors are knowledgeable and the staff is very friendly.",
      rating: 5,
    },
    {
      name: "Arjun Mehta",
      role: "Patient, India",
      content:
        "Very professional services and on-time appointments. I felt comfortable and well cared for.",
      rating: 4,
    },
    {
      name: "Sophia Martinez",
      role: "Patient, Spain",
      content:
        "Amazing experience. Doctors were attentive and explained everything clearly. Highly recommend!",
      rating: 5,
    },
    {
      name: "Ananya Gupta",
      role: "Patient, India",
      content:
        "Great experience overall. The platform is user-friendly and doctors are highly professional.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our <span className="text-blue-600"> Patients </span>Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from patients around the world who trust MeetMyDoc for their
            healthcare needs.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-md rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 italic mb-4">
                "{testimonial.content}"
              </p>

              {/* Name & Role */}
              <div>
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
