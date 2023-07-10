import asyncHandler from "express-async-handler";

//@desc  Auth user/ser token
// route POST /api/users/auth
//@access Public

const authUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Auth User" });
});

//@desc  Register a new user
// route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Regester User" });
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

const getUserprofile = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "User profile" });
});


//@desc  Update user profile
// route put  /api/users/auth
//@access Private

const updateUserprofile = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Update User profile" });
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserprofile,
	updateUserprofile,
};
