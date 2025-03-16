const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");

// Middleware to authenticate users
const userAuthentication = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies[process.env.COOKIE_NAME];
    if (!token) {
      return next(new APIError("Unauthorized. Token not found", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(new APIError("Unauthorized. User not found", 401));
    }
    req.user = user;

   
    next();
  } catch (error) {
    next(new APIError(error.message || "Internal Server Error", error.status || 500));
  }
};

module.exports = { userAuthentication };