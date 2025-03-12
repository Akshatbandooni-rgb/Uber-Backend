const User = require("../models/user.model");
const APIError = require("../utils/apiError");
const Constants = require("../constants");

class UserRepository {
  constructor() {}

  createUser(userData) {
    try {
      const user = new User(userData);
      return user.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository();
