import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance, { setLogoutHandler } from "../apis/axiosInstance";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";

  const [userData, setUserData] = useState(false);

  const [loadingUser, setLoadingUser] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [doctors, setDoctors] = useState([]);
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      setLoadingUser(true);
      const { data } = await axiosInstance.get(`/api/user/get-profile`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (data.success) {
        setUserData(data.userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserData(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(false);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {
    loadUserProfileData();
  }, []);

  useEffect(() => {
    setLogoutHandler(() => {
      setIsAuthenticated(false);
      setUserData(false);
      setLoadingUser(false);
    });
  }, []);

  const value = {
    doctors,
    currencySymbol,
    getAllDoctors,
    setIsAuthenticated,
    isAuthenticated,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    loadingUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
