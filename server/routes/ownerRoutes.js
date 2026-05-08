import express from "express";
import wrapAsync from "../wrapAsync.js";
import { getOwnerBookings, getOwnerUsers } from "../controllers/ownerController.js";

const router = express.Router();

router.get("/getbookings", wrapAsync(getOwnerBookings))
router.get("/getusers", wrapAsync(getOwnerUsers))


export default router;