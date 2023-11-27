require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();
const connectDB = require("./db/connectDB");
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send('<a href="/send" >send</a>');
});

app.get("/send", async (req, res) => {
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
    from: '"Yasir Ali" <ya4432502@gmail.com>',
    to: "yasirali.bscssef20@iba-suk.edu.pk",
    subject: "hello",
    text: "sha hall aa",
  });
  console.log(info);
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
