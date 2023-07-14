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
	if (await user.matchPasswords(password)) {
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
	const { email, password, typeOfUser, firstName, lastName, contactNumber } = req.body; //Getting user values
	const userExists = await User.findOne({ email: email }); //Check if user exists based on email
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	};

	const user = await User.create({
		email,
		password,
		typeOfUser,
		userDetails: {
			firstName: 'aqmet',
			lastName: 'basibuyuk',
			contactNumber: '273489234',
		}
	}) //Create user

	if (user) { //Check if user created succesfully
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			email: user.email,
			password: user.password,
			typeOfUser: user.typeOfUser,
			userDetails: {
				firstName: user.userDetails.firstName,
				lastName: user.userDetails.lastName,
				contactNumber: user.userDetails.contactNumber
			}
		})
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
	res.status(200).json({ message: "Logout  User" });
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "User email: " });
});


// @desc Update user profile
// route PUT /api/users/login
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {

	res.status(200).json({ message: "Update User profile" });
});

export {
	loginUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
