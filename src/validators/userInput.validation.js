var validator = require("validator");
const APIError = require("../utils/apiError");

const validateInput = ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new APIError("All fields are required", 400);
  }
  if (!validator.isLength(firstName, { min: 4 })) {
    throw new APIError("First name should have atleast 4 characters", 400);
  }
 
  if (!validator.isEmail(email)) {
    throw new APIError("Invalid email format", 400);
  }
  if (!validator.isStrongPassword(password)) {
    throw new APIError("Password too weak", 400);
  }
};
module.exports = validateInput;
