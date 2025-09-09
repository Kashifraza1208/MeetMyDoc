import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance, { setLogoutHandler } from "../apis/axiosInstanceDoctor";
import { useEffect } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [appointments, setAppointments] = useState([]);
  const [dashData, setData] = useState(false);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [loadingAppointment, setLoadingDashAppointment] = useState(false);

  const [isAuthenticatedDoctor, setIsAuthenticatedDoctor] = useState(false);

  const [profileData, setProfileData] = useState(false);

  const [appointmentPage, setAppointmentPage] = useState(1);
  const [appointmentTotalPage, setAppointmentTotalPage] = useState(0);
  const [appointmentSearch, setAppointmentSearch] = useState("");

  const getAppointments = async () => {
    try {
      setLoadingDashAppointment(true);
      const { data } = await axiosInstance.get(
        `/api/doctor/appointments?page=${appointmentPage}&limit=${8}&search=${appointmentSearch}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        setAppointmentTotalPage(data.count);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingDashAppointment(false);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/doctor/complete-appointment`,
        { appointmentId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/doctor/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/doctor/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (data.success) {
        setIsAuthenticatedDoctor(true);
        setProfileData(data.profileData);
      } else {
        setIsAuthenticatedDoctor(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticatedDoctor(false);
    } finally {
      setLoadingDoctor(false);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/doctor/dashboard`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (data.success) {
        setData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    setLogoutHandler(() => {
      setIsAuthenticatedDoctor(false);
      setLoadingDoctor(false);
    });
  }, []);

  const value = {
    backendUrl,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    profileData,
    getProfileData,
    setProfileData,
    setIsAuthenticatedDoctor,
    isAuthenticatedDoctor,
    setLoadingDoctor,
    loadingDoctor,
    loadingAppointment,
    setAppointmentPage,
    appointmentPage,
    appointmentTotalPage,
    appointmentSearch,
    setAppointmentSearch,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
