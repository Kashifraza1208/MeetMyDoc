// handling user requests
import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

import razorpay from "razorpay";
import {
  generateAccessToken,
  generateAcessTokenAndRefreshToken,
} from "../utils/sendToken.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    // hashing strong password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    await newUser.save();

    res.json({
      success: true,
      message: "Registerd successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api for login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      {
        return res.json({
          success: false,
          message: "Missing Details",
        });
      }
    }

    // check if email  exists
    const user1 = await userModel.findOne({ email });
    if (!user1) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user1.password);

    if (isMatch) {
      const { accessToken, refreshToken } =
        await generateAcessTokenAndRefreshToken(user1._id);

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
    } else {
      return res.status(401).json({
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

// generate new accessToken

const refreshtToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      return res
        .status(401)
        .json({ success: false, message: "Missing refresh token" });

    const user = await userModel.findOne({ refreshToken });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid refresh Token",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, decode) => {
        if (error)
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });

        const accessToken = generateAccessToken(decode.id);

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
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
    }

    await userModel.findByIdAndUpdate(user._id, { refreshToken: null });

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

//user details

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel
      .findById(userId)
      .select("-password -refreshToken");
    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API TO update user PROFILE

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.user.id;

    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data missing",
      });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      address: JSON.parse(address),
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
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

//API to book appointment

const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor not available",
      });
    }

    let slots_booked = docData.slots_booked;
    //checking for slot availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slot data in doctors data

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({
      success: true,
      newAppointment,
      message: "Appointment Booked",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API TO get user appointment for frontend my appointment page

const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await appointmentModel.find({ userId });

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

//API to cancel appintment

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user

    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthoriazed action",
      });
    }

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

// API to make payment of appointment using razorpay

const razorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    //creating options for razorpay

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order

    const order = await razorPayInstance.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API TO verify payment of razorpay

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      return res.json({ success: true, message: "Payment Successful" });
    } else {
      return res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  refreshtToken,
  logout,
};
