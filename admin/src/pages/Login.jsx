import { useContext } from "react";

import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { setRole } = useContext(AppContext);
  const adminCtx = useContext(AdminContext);
  const doctorCtx = useContext(DoctorContext);

  const isAuthenticated = adminCtx?.isAuthenticated || false;
  const setIsAuthenticated = adminCtx?.setIsAuthenticated || (() => {});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const loadingAuth = adminCtx?.loadingAuth || false;

  const checkAuth = adminCtx?.checkAuth || (() => {});

  const isAuthenticatedDoctor = doctorCtx?.isAuthenticatedDoctor || false;
  const setIsAuthenticatedDoctor =
    doctorCtx?.setIsAuthenticatedDoctor || (() => {});

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/admin/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (data.success) {
          await checkAuth();
          localStorage.setItem("role", "Admin");
          setRole("Admin");
          setIsAuthenticated(true);
          toast.success(data.message);
          setEmail("");
          setPassword("");
          navigate("/admin-dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (data.success) {
          localStorage.setItem("role", "Doctor");
          setRole("Doctor");
          navigate("/doctor-dashboard");
          setIsAuthenticatedDoctor(true);
          toast.success(data.message);
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (isAuthenticatedDoctor) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticatedDoctor, navigate, location]);

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form className="h-screen flex items-center" onSubmit={onSubmitHandler}>
      <div
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] 
      sm:min-w-96 border rounded-xl border-gray-200 text-zinc-600 text-sm shadow-lg"
      >
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[var(--primary)]">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            name="email"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {showPassword ? (
            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-400"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-400"
            />
          )}
        </div>
        <button className="bg-[var(--primary)] text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="underline text-[var(--primary)] cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="underline text-[var(--primary)] cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
