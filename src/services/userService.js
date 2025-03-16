const userRepository = require("../repository/userRepository");
const User = require("../models/user.model");
const APIError = require("../utils/apiError");
const Constants = require("../constants");
class UserService {
  constructor() {}

  async registerUser({ firstName, lastName, email, password }) {
    try {
      const isExistingUser = await User.findByEmail(email);
      if (isExistingUser) {
        throw new APIError(Constants.errors.ALREADY_EXISTS, 409);
      }
      const userData = { firstName, lastName, email, password };
      const user = await userRepository.createUser(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  async loginUser({ email, password }) {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw new APIError(Constants.errors.USER_NOT_FOUND, 404);
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new APIError("Invalid Credentials", 401);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
