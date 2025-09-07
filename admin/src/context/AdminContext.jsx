import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../apis/axiosInstance";
import { useEffect } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const [loadingAuth, setLoadingAuth] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [loadingDash, setLoadingDash] = useState(false);
  const [loadingAppointment, setLoadingDashAppointment] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [dashData, setDashData] = useState(false);

  const getAllDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/admin/all-doctors`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (data.success) {
        setDoctors(data.doctors);
        setIsAuthenticated(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/admin/change-availablity`,
        { docId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      setLoadingDashAppointment(true);
      const { data } = await axiosInstance.get(`/api/admin/all-appointments`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (data.success) {
        setIsAuthenticated(true);
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingDashAppointment(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/admin/cancel-appointment`,
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
        setIsAuthenticated(true);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashboardData = async () => {
    try {
      setLoadingDash(true);
      const { data } = await axiosInstance.get(`/api/admin/dashboard`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (data.success) {
        setDashData(data.dashData);
        setIsAuthenticated(true);
      } else {
        toast.error(data.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingDash(false);
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/me`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    backendUrl,
    doctors,
    getAllDoctors,
    loading,
    changeAvailablity,
    getAllAppointments,
    appointments,
    setAppointments,
    cancelAppointment,
    getDashboardData,
    dashData,
    loadingDash,
    loadingAppointment,
    isAuthenticated,
    setIsAuthenticated,
    loadingAuth,
    checkAuth,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
