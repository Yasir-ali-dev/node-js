require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const connecDB = require("./db/connectDB");
const { default: mongoose } = require("mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:4000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get("/", (req, res) => {
  res.render("facebook");
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

app.get("/dashboard", (req, res) => {
  console.log(req.user);
  res.json("login successfull");
});

app.get("/auth/logout", (req, res) => {
  req.session.destroy();

  res.json("logout successfully");
});

app.get("/failed", (req, res) => {
  res.json("login failed");
});

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
