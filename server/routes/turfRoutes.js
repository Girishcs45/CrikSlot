import express from "express";
import wrapAsync from "../wrapAsync.js";
import { FetchOneTurf, FetchOwnerTurfs, FetchTurf, RegTurf } from "../controllers/turfController.js";

const router = express.Router();

router.get("/getturf", wrapAsync(FetchTurf))
router.get("/getoneturf", wrapAsync(FetchOneTurf))
router.post("/addturf", wrapAsync(RegTurf))
router.get("/ownerturfs", wrapAsync(FetchOwnerTurfs))


export default router;