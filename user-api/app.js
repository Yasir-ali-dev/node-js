require("dotenv").config();
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const app = express();

const userRouter = require("./routes/user-route");
const errorHandler = require("./middlewares/error-handler");

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.json({ msg: "/ " });
});

const port = process.env.PORT || 4001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening to the port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
start();
