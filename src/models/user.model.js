const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [4, "First name must be at least 4 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    socketID: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT_ROUNDS) || 10
    );
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
