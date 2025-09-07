import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  cancelAppointmentForAdmin,
  getAdminInfo,
  getAllAppointments,
  loginAdmin,
  logout,
  refreshtToken,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logout);
adminRouter.post("/refresh-token", refreshtToken);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availablity", authAdmin, changeAvailability);
adminRouter.get("/all-appointments", authAdmin, getAllAppointments);
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointmentForAdmin);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.get("/me", authAdmin, getAdminInfo);

export default adminRouter;
