const { default: mongoose } = require("mongoose");

const authSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    unique: [true, "Email should be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [5, "password should be atleast 5 character "],
  },
});
module.exports = mongoose.model("Auth", authSchema);
