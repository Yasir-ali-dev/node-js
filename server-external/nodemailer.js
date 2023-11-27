require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
// app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("email-form");
});

app.post("/send", async (req, res) => {
  console.log(req.body);
  const textAccount = await nodemailer.createTestAccount();
  const transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_MAIL,
      pass: process.env.ETHEREAL_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: req.body.email,
    to: process.env.ETHEREAL_MAIL,
    subject: req.body.subject,
    text: req.body.message,
  });
  res.send(info);
});

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
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
