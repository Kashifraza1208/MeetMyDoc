import jwt from "jsonwebtoken";

//doctor authentication middlware

const authDoctor = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token_decode = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.doctor = { id: token_decode.id };
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoctor;
