import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getAllDoctors } = useContext(AppContext);

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (date) => {
    const dateArray = date.split("_");
    return (
      dateArray[0] +
      " " +
      months[parseInt(dateArray[1]) - 1] +
      ", " +
      dateArray[2]
    );
  };

  const getUserAppointment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            {
              headers: { token },
            }
          );
          if (data.success) {
            getUserAppointment();
            navigate("/my-appointments");
          } else {
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-gray-200 border-b">
        My appointments
      </p>
      <div>
        {loading
          ? Array(3)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-gray-200 border-b animate-pulse"
                >
                  <div className="w-32 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))
          : appointments &&
            appointments.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-gray-200 border-b"
              >
                <div>
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-32 bg-indigo-50"
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {item.docData.name}
                  </p>
                  <p>{item.docData.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address:</p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>
                  <p className="text-sm mt-1">
                    <span className="text-sm text-neutral-700 font-medium">
                      Date & Time:{" "}
                    </span>{" "}
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div>
                  {/* empty div to make it 2 columns for mobile view */}
                </div>

                <div className="flex flex-col gap-2 justify-end">
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <button className="sm:min-w-48 py-2 border bg-indigo-50 rounded text-stone-500">
                      Paid
                    </button>
                  )}

                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="text-sm text-stone-500 text-center 
                sm:min-w-48 py-2 border-gray-200 border rounded hover:bg-[var(--primary)] hover:text-white transition-all duration-300 "
                    >
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-500 text-center
                sm:min-w-48 py-2 border border-gray-200 rounded hover:bg-red-500 hover:text-white transition-all duration-300 "
                    >
                      Cancel appointment
                    </button>
                  )}

                  {item.cancelled && !item.isCompleted && (
                    <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                      Appointment Cancel
                    </button>
                  )}

                  {item.isCompleted && (
                    <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MyAppointments;
