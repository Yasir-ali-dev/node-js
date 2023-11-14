const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username should be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [5, "password should be atleast 5 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", userSchema);
