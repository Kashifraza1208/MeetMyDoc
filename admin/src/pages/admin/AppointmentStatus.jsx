import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function AppointmentStatus({
  pendingAppointments,
  completedAppointments,
  cancelledAppointments,
}) {
  return (
    <div className="rounded-2xl bg-white shadow-md p-6 mt-10">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="p-2 rounded-lg bg-indigo-100">
          <FaClock className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="font-semibold text-lg text-gray-800">
          Appointment Status
        </h2>
      </div>

      {/* Status blocks */}
      <div className="space-y-4 mt-4">
        {/* Pending */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-100">
          <div className="flex items-center gap-3">
            <FaClock className="text-yellow-600 w-5 h-5" />
            <span className="font-medium text-gray-800">Pending</span>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-200 text-yellow-700">
            {pendingAppointments}
          </span>
        </div>

        {/* Completed */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-green-100">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600 w-5 h-5" />
            <span className="font-medium text-gray-800">Completed</span>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-700">
            {completedAppointments}
          </span>
        </div>

        {/* Cancelled */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-red-100">
          <div className="flex items-center gap-3">
            <FaTimesCircle className="text-red-600 w-5 h-5" />
            <span className="font-medium text-gray-800">Cancelled</span>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-200 text-red-700">
            {cancelledAppointments}
          </span>
        </div>
      </div>
    </div>
  );
}
