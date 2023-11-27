require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

// app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("email-form");
});

app.post("/send", async (req, res) => {
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

app.post("/send-email", async (req, res) => {
  console.log(req.body);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "yasirali.bscssef20@iba-suk.edu.pk", // Change to your recipient
    from: process.env.SENDER_IDENTITY_EMAIL, // Change to your verified sender
    subject: req.body.subject,
    text: req.body.message,
  };
  const info = await sgMail.send(msg);
  res.json(info);
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
