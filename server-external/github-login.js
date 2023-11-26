require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const connecDB = require("./db/connectDB");
const { default: mongoose } = require("mongoose");
const GitHubStrategy = require("passport-github").Strategy;

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
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:4000/auth/github/callback",
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

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

app.get("/", (req, res) => {
  res.render("github");
});
app.get("/dashboard", (req, res) => {
  console.log(req.user);
  res.json(`hello there ${req.user.displayName}`);
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
