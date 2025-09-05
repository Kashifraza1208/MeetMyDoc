import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Go to the Doctors section, select your preferred doctor, choose a time slot, and confirm your booking online.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Yes, you can reschedule or cancel an appointment through your patient dashboard before the appointment time.",
  },
  {
    question: "Is online payment secure?",
    answer:
      "Absolutely. We use Razorpay to ensure your payments are encrypted and processed securely.",
  },
  {
    question: "Do doctors provide online consultations?",
    answer:
      "Yes, many doctors on our platform offer online consultations. Check the doctor profile for availability.",
  },
  {
    question: "Is there 24/7 support available?",
    answer:
      "Yes, our support team is available round-the-clock to assist you with bookings and queries.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We’ve got answers to help you get started.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium hover:bg-gray-100 transition"
              >
                {faq.question}
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all  duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? " " : "max-h-0"
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
