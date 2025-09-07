//API for adding doctro

import validator from "validator";
import bcrypt from "bcrypt";
import upload from "../middlewares/multer.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    //checking for all data to add doctor

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //validate email format

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing doctor password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor Added",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const payload = {
      email,
      role: "admin",
    };
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      });
      const optionsForAccessToken = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 1 * 60 * 60 * 1000,
      };

      if (rememberMe) {
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
          }
        );
        const optionsForRefreshToken = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 5 * 24 * 60 * 60 * 1000,
        };
        res
          .cookie("accessToken", accessToken, optionsForAccessToken)
          .cookie("refreshToken", refreshToken, optionsForRefreshToken)
          .json({
            success: true,
            message: "Login successfully",
          });
      } else {
        res.cookie("accessToken", accessToken, optionsForAccessToken).json({
          success: true,
          message: "Login successfully",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API got refrsh new accessToken
const refreshtToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      return res
        .status(401)
        .json({ success: false, message: "Missing refresh token" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, decode) => {
        if (error)
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });

        const payload = {
          email: decode.email,
          role: "admin",
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        });

        const optionsForAccessToken = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 1 * 60 * 60 * 1000,
        };

        res.cookie("accessToken", accessToken, optionsForAccessToken).json({
          success: true,
          message: "AcessToken refreshed",
        });
      }
    );
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    };

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get profile information

const getAdminInfo = async (req, res) => {
  try {
    res.json({
      success: true,
      admin: {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select({ password: 0, refreshToken: 0 });
    res.json({
      success: true,
      message: "Data Fetched",
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get all patient list for admin panel

const allPatients = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select({ password: 0, refreshToken: 0 });
    res.json({
      success: true,
      message: "Data Fetched",
      users,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get all appointment list

const getAllAppointments = async (req, res) => {
  try {
    // get all appointments from database
    const appointments = await appointmentModel
      .find({})
      .sort({ slotDate: "asc", slotTime: "asc" });
    if (appointments) {
      res.json({ success: true, appointments });
    } else {
      res.json({ success: false, message: "No appointments available" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for appointment cancellation

const cancelAppointmentForAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releading doctor slots

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get dashbaord data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select("-password -refreshToken");
    const users = await userModel.find({}).select("-password -refreshToken");
    const appointments = await appointmentModel
      .find({})
      .populate("docId", "-password -refreshToken")
      .populate("userId", "-password -refreshToken");

    const dashData = {
      activeDoctors: doctors.filter((item) => item.available).length,
      inactiveDoctors: doctors.filter((item) => !item.available).length,
      appointments: appointments.length,
      completedAppointment: appointments.filter((item) => item.isCompleted)
        .length,
      cancelAppointment: appointments.filter((item) => item.cancelled).length,
      patients: users.length,
      pendingAppointment: appointments.filter(
        (item) => !item.isCompleted && !item.cancelled
      ).length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  getAllAppointments,
  cancelAppointmentForAdmin,
  adminDashboard,
  refreshtToken,
  logout,
  getAdminInfo,
  allPatients,
};
