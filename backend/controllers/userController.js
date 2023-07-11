import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"

//@desc  Auth user/ser token
// route POST /api/users/auth
//@access Public

const authUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Auth User" });
});

//@desc  Register a new user
// route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
	console.log(req.body);
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
		firstName,
		lastName,
		contactNumber
	}); //Create user

	if (user) { //Check if user created succesfully
		res.status(201).json({
			_id: user._id,
			email: user.email,
			password: user.password,
			typeOfUser: user.typeOfUser,
			userDetails: {
				firstName: user.firstName,
				lastName: user.lastName,
				contactNumber: user.contactNumber
			}
		})
	} //Note: Storing token in http cookie, not sending to db
	else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

//@desc  Logout user
// route POST /api/users/logout
//@access Public

const logoutUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Logout  User" });
});

//@desc  Get user profile
// route POST /api/users/profile
//@access private

const getUserProfile = asyncHandler(async (req, res) => {
	const testUser1 = User({ email: "testUser1@email.com", password: "testtest" })
	console.log(testUser1.email);
	res.status(200).json({ message: "User email: " + testUser1.email });
});


//@desc  Update user profile
// route put  /api/users/auth
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {

	res.status(200).json({ message: "Update User profile" });
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
