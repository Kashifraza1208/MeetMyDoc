import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance, { setLogoutHandler } from "../apis/axiosInstance";
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
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  // Doctors
  const [doctorPage, setDoctorPage] = useState(1);
  const [doctorTotalPage, setDoctorTotalPage] = useState(0);
  const [doctorSearch, setDoctorSearch] = useState("");

  // Appointments
  const [appointmentPage, setAppointmentPage] = useState(1);
  const [appointmentTotalPage, setAppointmentTotalPage] = useState(0);
  const [appointmentSearch, setAppointmentSearch] = useState("");

  // Users
  const [userPage, setUserPage] = useState(1);
  const [userTotalPage, setUserTotalPage] = useState(0);
  const [userSearch, setUserSearch] = useState("");

  const [dashData, setDashData] = useState(false);

  const getAllDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/api/admin/all-doctors?page=${doctorPage}&limit=${8}&search=${doctorSearch}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        setDoctorTotalPage(data.count);
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
      const { data } = await axiosInstance.get(
        `/api/admin/all-appointments?page=${appointmentPage}&limit=${6}&search=${appointmentSearch}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        setIsAuthenticated(true);
        setAppointments(data.appointments);
        setAppointmentTotalPage(data.count);
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

  const getAllPatients = async () => {
    try {
      setLoadingUsers(true);
      const { data } = await axiosInstance.get(
        `/api/admin/all-users?page=${userPage}$limit=${8}&search=${userSearch}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        setUsers(data.users);
        setUserTotalPage(data.count);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingUsers(false);
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

  useEffect(() => {
    setLogoutHandler(() => {
      setIsAuthenticated(false);
      setLoadingAuth(false);
    });
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
    getAllPatients,
    users,
    loadingUsers,
    doctorPage,
    setDoctorPage,
    doctorTotalPage,
    doctorSearch,
    setDoctorSearch,
    appointmentPage,
    setAppointmentPage,
    appointmentTotalPage,
    appointmentSearch,
    setAppointmentSearch,
    userPage,
    setUserPage,
    userTotalPage,
    userSearch,
    setUserSearch,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
