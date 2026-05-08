import Booking from "../models/booking.js";
import Turf from "../models/turfs.js";

export const getOwnerBookings = async (req, res) => {
  const { id, date, page = 1, limit = 10 } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Owner id is required" });
  }

  const turfIds = await Turf.find({ ownerId: id }).distinct("_id");

  if (!turfIds.length) {
    return res.json({
      bookings: [],
      total: 0,
      page: 1,
      pages: 0,
    });
  }

  const filter = {
    turf: { $in: turfIds },
  };


  if (date) filter.bookingDate = date;

  const bookings = await Booking.find(filter)
    .populate("turf", "name location")
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Booking.countDocuments(filter);

  res.json({
    bookings,
    total,
    page: Number(page), 
    pages: Math.ceil(total / limit),
  });
};

export const getOwnerUsers = async (req, res) => {
  const { id } = req.query;

  const turfIds = await Turf.find({ ownerId: id }).distinct("_id");

  const users = await Booking.aggregate([
    { $match: { turf: { $in: turfIds } } },
    {
      $group: {
        _id: "$user",
        totalBookings: { $sum: 1 },
        totalSpent: { $sum: "$totalAmount" }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" }
  ]);

  res.json(users);
};
