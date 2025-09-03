import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

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
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
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

    const token = await jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
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
    const docId = req.user.id;
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
    const docId = req.user.id;
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
    const docId = req.user.id;
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
    const docId = req.user.id;
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
    const docId = req.user.id;
    const profileData = await doctorModel.findById(docId).select("-password");
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
    const docId = req.user.id;
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
};
