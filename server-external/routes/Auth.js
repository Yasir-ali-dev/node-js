const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const LocalAuth = require("../model/LocalAuth");

passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    if (!username || !password) {
      res.status(400).json({ msg: "Please provide username and password" });
    }
    const user = await LocalAuth.findOne({ username: username });
    if (!user) {
      res.status(404).json({ msg: "User Not Found!" });
    }
    const salt = 10;

    crypto.pbkdf2(
      Password,
      salt,
      310000,
      32,
      "sha256",
      (err, hashedPassword) => {
        if (err) {
          return callback(err);
        }
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
        }
        return callback(null, user);
      }
    );
  })
);
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
passport.deserializeUser((user, callback) => {
  process.nextTick(() => {
    callback(null, user);
  });
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    // failureFlash: true,
    failureFlash: true,
  })
);

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
    }
  );
});

module.exports = router;
