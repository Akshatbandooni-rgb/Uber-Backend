const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");
const asyncHandler = require("../utils/asyncHandler");

router.post("/register", asyncHandler(registerUser));

module.exports = router;
