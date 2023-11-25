const { default: mongoose } = require("mongoose");

const authSchema = mongoose.Schema({
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [5, "password should be atleast 5 character "],
  },
  username: {
    type: String,
    required: [true, "password is required"],
    unique: [true, "username must be unique"],
  },
});
module.exports = mongoose.model("localAuths", authSchema);
