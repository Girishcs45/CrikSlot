import mongoose from "mongoose";
import Booking from "../models/booking.js";
import Turf from "../models/turfs.js";
import User from "../models/user.js";

export const SlotBooking = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { turf_Id, userId, date, slots, amount } = req.body;

        if (!turf_Id || !userId || !date || !Array.isArray(slots) || slots.length === 0 || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required and at least one slot must be selected"
            });
        }

        const turf = await Turf.findById(turf_Id).session(session);
        if (!turf) {
            await session.abortTransaction();
            return res.status(404).json({ success: false, message: "Turf not found" });
        }

        const user = await User.findById(userId).session(session);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const conflict = await Booking.findOne({
            turf: turf_Id,
            bookingDate: date,
            bookedSlots: { $in: slots }
        }).session(session);

        if (conflict) {
            await session.abortTransaction();
            return res.status(409).json({
                success: false,
                message: "One or more selected slots are already booked"
            });
        }

        const booking = await Booking.create(
            [
                {
                    turf: turf_Id,
                    user: userId,
                    bookingDate: date,
                    bookedSlots: slots,
                    totalAmount: amount
                }
            ],
            { session }
        );

        user.bookings.push(booking[0]._id);
        turf.bookings.push(booking[0]._id);

        await user.save({ session });
        await turf.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking: booking[0]
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error("Booking error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while creating booking",
            error: error.message
        });
    }
};

export const SlotInfo = async (req, res) => {
    try {
        const { turfId, date } = req.query;

        if (!turfId || !date) {
            return res.status(400).json({
                success: false,
                message: "turfId and date are required"
            });
        }

        const turf = await Turf.findById(turfId);
        if (!turf) {
            return res.status(404).json({
                success: false,
                message: "Turf not found"
            });
        }

        const bookings = await Booking.find({
            turf: turfId,
            bookingDate: date
        }).select("bookedSlots");

        const bookedSlots = bookings.flatMap(booking => booking.bookedSlots);

        return res.status(200).json({
            success: true,
            bookedSlots
        });

    } catch (error) {
        console.error("SlotInfo error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching slot info",
            error: error.message
        });
    }
};

export const getUserBookings = async (req, res) => {
  const { userId } = req.params;
      
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required"
    });
  }

  const userExists = await User.exists({ _id: userId });

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const bookings = await Booking.find({ user: userId })
    .populate({
      path: "turf",
      select: "name image location"
    })
    .sort({ createdAt: -1 })
    .lean(); // ⚡ faster plain objects

  return res.status(200).json({
    success: true,
    count: bookings.length,
    bookings
  });
};
