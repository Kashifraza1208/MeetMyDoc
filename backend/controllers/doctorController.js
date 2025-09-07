import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/sendToken.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availablity Changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//doctor list

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select(["-password", "-email", "-refreshToken"]);
    res.json({
      success: true,
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

//API FOR doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(doctor._id);
    const refreshToken = generateRefreshToken(doctor._id);

    await doctorModel.findByIdAndUpdate(doctor._id, {
      refreshToken: refreshToken,
    });

    const optionsForAccessToken = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 60 * 60 * 1000,
    };
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
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// generate new accessToken

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

        const docId = decode.id;

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
          return res.json({
            success: false,
            message: "Invalid refresh Token",
          });
        }

        if (refreshToken !== doctor.refreshToken) {
          return res.json({
            success: false,
            message: "Invalid or expired refresh token",
          });
        }

        const accessToken = generateAccessToken(doctor.id);

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
    const docId = req.doctor.id;

    const doctor = await doctorModel.findById(docId);

    if (!doctor) {
      res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctorModel.findByIdAndUpdate(doctor._id, { refreshToken: null });

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
        messge: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get all appointment of specific doctor

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const appointments = await appointmentModel.find({ docId });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API  to mark appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.doctor.id;
    const appointData = await appointmentModel.findById(appointmentId);
    if (appointData && appointData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Mark failed",
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

//API  to cancel appointment completed for doctor panel

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.doctor.id;
    const appointData = await appointmentModel.findById(appointmentId);
    if (appointData && appointData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({
        success: true,
        message: "Appointment Cacelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Cancellation failed",
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

//API to get dashbaord data for doctor panel

const doctorDashbaord = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      completedAppointment: appointments.filter((item) => item.isCompleted)
        .length,
      cancelAppointment: appointments.filter((item) => item.cancelled).length,
      latestAppointments: appointments.reverse().slice(0, 5),
      pendingAppointment: appointments.filter(
        (item) => !item.isCompleted && !item.cancelled
      ).length,
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

// API to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const profileData = await doctorModel
      .findById(docId)
      .select({ password: 0, refreshToken: 0 });
    res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Api to update doctor profile data from doctor panel

const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available } = req.body;
    const docId = req.doctor.id;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({
      success: true,
      message: "Profile Updated",
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
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashbaord,
  doctorProfile,
  updateDoctorProfile,
  refreshtToken,
  logout,
};
