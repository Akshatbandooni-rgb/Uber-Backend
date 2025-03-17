const validateInput = require("../validators/userInput.validation");
const APIResponse = require("../utils/apiResponse");
const userService = require("../services/userService");
const registerUser = async (req, res, next) => {
  try {
    validateInput(req.body);
    const user = await userService.registerUser(req.body);
    const successResponse = new APIResponse(
      "User registration successful",
      200
    );
    res
      .status(successResponse.statusCode)
      .json({ ...successResponse.toJSON(), data: user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    //TODO: Validate Input
    const user = await userService.loginUser(req.body);
    const successResponse = new APIResponse("User login successful", 200);
    const token = await user.generateJwtToken();
    //set up token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res
      .status(successResponse.statusCode)
      .json({ ...successResponse.toJSON(), data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
