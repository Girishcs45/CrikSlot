import express from "express";
import wrapAsync from "../wrapAsync.js";
import { OwnerLogin, OwnerSignup } from "../controllers/authOwnerController.js";

const router = express.Router();

router.post("/ownersignup", wrapAsync(OwnerSignup));
router.post("/login", wrapAsync(OwnerLogin));   

 
export default router;