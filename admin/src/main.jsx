import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider, { AppContext } from "./context/AppContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";

import { useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const RoleWrapper = () => {
  const { role } = useContext(AppContext);

  if (role === "Doctor")
    return (
      <DoctorContextProvider>
        <App />
      </DoctorContextProvider>
    );
  if (role === "Admin")
    return (
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    );
  return <App />;
};

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <RoleWrapper />
      </AppContextProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
