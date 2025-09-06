import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { loadingUser, isAuthenticated } = useContext(AppContext);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute
              loadingUser={loadingUser}
              isAuthenticated={isAuthenticated}
            >
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute
              loadingUser={loadingUser}
              isAuthenticated={isAuthenticated}
            >
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
