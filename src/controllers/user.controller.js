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

module.exports = {
  registerUser,
};
