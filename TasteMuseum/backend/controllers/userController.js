import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js"

// @desc Login user/set token
// route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });

	if (!user) {
		res.status(401);
		throw new Error("Incorrect e-mail");
	}
	if (!(await user.matchPasswords(password))) {
		res.status(401);
		throw new Error("Incorrect password");
	}
	generateToken(res, user._id);
	res.status(200).json({ message: `Login succesfull. Logged as: ${user.email}` });
});

// @desc Register a new user
// route POST /api/users/register
// @access Public

const registerUser = asyncHandler(async (req, res) => {
	const { email, password, userType, userDetails } = req.body; //Getting user values
	const userExists = await User.findOne({ email: email }); //Check if user exists based on email
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	};

	const user = await User.create({
		email,
		password,
		userType,
		userDetails
	}) //Create user

	if (user) { //Check if user created succesfully
		generateToken(res, user._id);
		// res.status(201).json({
		// 	_id: user._id,
		// 	email: user.email,
		// 	password: user.password,
		// 	userType: user.userType,
		// 	userDetails: user.userDetails
		// })
	} //Note: Storing token in http cookie, not sending to db
	else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc Logout user
// route POST /api/users/logout
// @access Public

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0)
	});

	res.status(200).json({ message: "Logout succesfull" });
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		email: req.user.email,
		firstName: req.user.userDetails.firstName,
		lastName: req.user.userDetails.lastName,
		contactNumber: req.user.userDetails.contactNumber
	};
	res.status(200).json({ message: `Email: ${user.email}, name: ${user.firstName}, surname: ${user.lastName}` });
});


// @desc Update user profile
// route PUT /api/users/login
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.password = req.body.password || user.password;
		user.userDetails = req.body.userDetails || user.userDetails;

		const updatedUser = await user.save();
		if (updatedUser) {
			res.status(200).json({ message: "User profile updated" });
		}
		else {
			res.status(401).json({ message: "Nothing has updated" });
		}
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

export {
	loginUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
