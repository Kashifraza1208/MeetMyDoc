import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (id) => {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
};

export const generateAcessTokenAndRefreshToken = async (id) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await userModel.findByIdAndUpdate(id, { refreshToken: refreshToken });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};
