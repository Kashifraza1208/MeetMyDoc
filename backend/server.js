import express from "express";

import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

const port = process.env.PORT || 4000;

connectDB();

connectCloudinary();

//middlewares

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://meetmydoc.vercel.app",
      "https://adminmeetmydoc.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],

    credentials: true,
  })
);

//api endpoint
app.get("/", (req, res) => {
  res.send("api working");
});

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});
