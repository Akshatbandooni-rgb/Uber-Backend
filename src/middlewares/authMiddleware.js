const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware to authenticate users
const userAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies[process.env.COOKIE_NAME]; 
    if (!token) throw new Error("Access Denied");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const user = await User.findById(decodedToken._id); 

    if (!user) throw new Error("Token not valid");

    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

module.exports = { userAuthentication };