import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import turfRoutes from "./routes/turfRoutes.js"
import authOwnerRoutes from "./routes/authOwnerRoutes.js"
import bookingRoutes from "./routes/bookingsRoutes.js"
import ownerRoutes from "./routes/ownerRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 4000;
const dbUrl = process.env.CRICKSLOT_DB_URL;


mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.use("/auth", authRoutes);
app.use("/authowner", authOwnerRoutes);
app.use("/user", userRoutes );
app.use("/turf",turfRoutes);
app.use("/t",bookingRoutes);
app.use("/owner",ownerRoutes);


app.get('/', (req, res) => {
    res.send('🚀 Crickslot Backend is running!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});