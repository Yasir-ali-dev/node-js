require("dotenv").config();
const express = require("express");
const connecDB = require("./db/connectDB");
const { default: mongoose, Schema } = require("mongoose");
const app = express();

const numberSchema = new Schema({
  integerNumber: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
    min: 0,
    max: 1000,
  },
});
const Numbers = mongoose.model("numbers", numberSchema);

async function creatingNumber(object) {
  try {
    await Numbers.create(object);
    console.log("user is created");
  } catch (error) {
    console.log(error._message);
    throw new Error(error);
  }
}
// creatingNumber({ integerNumber: 10000 });

const stringSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 5,
    maxLength: 7,
    enum: ["yasir", "danyal", "abrar"],
  },
});
const User = mongoose.model("users", stringSchema);
async function creatingTank(object) {
  try {
    await User.create(object);
    console.log("user is created");
  } catch (error) {
    console.log(error._message);
    throw new Error(error);
  }
}
// creatingTank({ name: "      DANYALE  " });

const port = process.env.PORT;
const start = async () => {
  try {
    await connecDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening to the port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.on("error", (err) => {
    logError(err);
  });
};

start();
