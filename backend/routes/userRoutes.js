import express from "express";
const router = express.Router();
import {
	loginUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);


export default router;
