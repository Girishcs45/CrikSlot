import express from "express";
import wrapAsync from "../wrapAsync.js";
import { EditUser, FetchUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/getuser", wrapAsync(FetchUser));
router.post("/edituser",wrapAsync(EditUser));
  
 
export default router;