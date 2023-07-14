import express from "express";
const router = express.Router();
import {
	loginUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
export default router;
