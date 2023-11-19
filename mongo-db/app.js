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
  time: {
    type: Date,
    default: Date.now,
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
// creatingNumber({ integerNumber: 1 });

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

const carSchema = new mongoose.Schema({
  driver: {
    type: mongoose.ObjectId,
  },
});
const Car = mongoose.model("cars", carSchema);
const ferrari = new Car();
ferrari.driver = new mongoose.Types.ObjectId();
// console.log(ferrari.driver.toString());

const arrOfString = new mongoose.Schema({
  names: {
    type: [String],
  },
});
const Names = new mongoose.model("names", arrOfString);
// console.log(Names({ names: ["yasir", "abal"] }).names);

const authorSchema = new Schema({
  id: Schema.Types.UUID, // Can also do `_id: 'UUID'`
  name: String,
});
const Author = mongoose.model("Author", authorSchema);

const bookSchema = new Schema({
  authorId: { type: Schema.Types.UUID, ref: "Author" },
});
const Book = mongoose.model("Book", bookSchema);

const author = new Author({ name: "Martin Fowler" });
const book = new Book({ authorId: "09190f70-3d30-11e5-8814-0f4df9a59c41" });

async function authorBook() {
  await author.save();
  await book.save();
}
authorBook();

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
    console.log(err);
  });
};

start();
