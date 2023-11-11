const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
require("express-async-errors");
const connecDB = require("./db/connectDB");
const { default: mongoose } = require("mongoose");
const itemRouter = require("./routes/shop-route");
const authRouter = require("./routes/auth-route");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const app = express();

const { validate } = require("jsonschema");
const bookSchema = require("./bookSchema.json");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("./errors");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/items", authentication, itemRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("home page");
});
app.post("/books", (req, res, next) => {
  const result = validate(req.body, bookSchema);

  // jsonschema validation results in a "valid" key being set to "false" if the instance doesn't match the schema
  if (!result.valid) {
    // pass the validation errors to the error handler
    //  the "stack" key is generally the most useful
    throw new BadRequestError(result.errors.map((error) => error.stack));
  }

  // at this point in the code, we know we have a valid payload with a data key
  const book = req.body;
  /* 
    (not implemented) insert the book into the database here
  */
  return res.status(201).json({ book });
});

app.use(errorHandler);

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
