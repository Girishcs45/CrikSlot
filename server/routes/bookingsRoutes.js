import express from "express";
import wrapAsync from "../wrapAsync.js";
import { getUserBookings, SlotBooking, SlotInfo } from "../controllers/bookingControllers.js";

const router = express.Router();

router.post("/slotbooking", wrapAsync(SlotBooking))
router.get("/slotsinfo", wrapAsync(SlotInfo))
router.get("/userbookings/:userId",wrapAsync(getUserBookings))

export default router;