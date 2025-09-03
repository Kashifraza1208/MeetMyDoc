import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider>
        <DoctorContextProvider>
          <App />
        </DoctorContextProvider>
      </AppContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
