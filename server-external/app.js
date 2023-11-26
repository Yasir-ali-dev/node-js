require("dotenv").config();
const express = require("express");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connecDB = require("./db/connectDB");
const errorHandler = require("./middlewares/errorHandler");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const LocalAuth = require("./model/LocalAuth");
require("./google-auth");

const app = express();
/*
const redisClient = require("redis").createClient({
  host: "127.0.0.1",
  port: 6379,
});
app.set("view engine", "pug");

// notice here we are telling express to render views using the pug templating engine.
const colors = ["red", "green", "blue"];

const connectRedis = async () => {
  redisClient.on("connect", () =>
    console.log("Redis is connected `127.0.0.1`")
  );
  redisClient.on("error", (err) => console.log("Redis client error", err));
  await redisClient.connect();
};
connectRedis();

redisClient.set("name", "Kalia");
async function getValue(key) {
  const name = await redisClient.get(key);
  console.log(name);
}
getValue("name");

app.get("/", (request, response) => {
  const firstName = "Ellie";
  return response.render("index", { name: firstName }); // here we are rendering a template called index.pug inside of the views folder
});

app.get("/colors", (request, response) => {
  // {colors} is ES2015 object shorthand notation for {colors: colors}
  return response.render("data", { colors });
});

*/

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

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/", (req, res) => {
  res.render("index");
});

// passport.use(
//   new LocalStrategy(
//     // the first parameter is an optional object with options
//     {
//       // when using the local strategy you MUST name your keys usernameField and passwordField.
//       usernameField: "username",
//       passwordField: "password",
//       passReqToCallback: true,
//       // by default this option is set to false, but when specified to true, the first parameter of the verify callback will be the request object. This is quite useful if you want to see if your application has multiple strategies and you want to see if a user is already logged in with an existing strategy,
//     },
//     async function verifyCallback(req, username, password, done) {
//       console.log(username, password);
//       const user = await LocalAuth.findOne({ username: username });
//       if (!user) {
//         return done({ msg: "user not found" }, false);
//       }
//       // if (!user || !user.validPassword(password)) {
//       //   return done(null, false);
//       // }

//       return done(null, user);
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });
// passport.deserializeUser((id, done) => {
//   LocalAuth.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);
app.get("/auth/google/failure", (req, res) => {
  res.send("Something went wrong");
});

app.get("/auth/protected", isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  console.log(req.user);
  res.send(`heelo ${name}, ${req.user.email} there`);
});

app.get("/auth/logout", (req, res) => {
  req.session.destroy();
  res.send(`see you next time`);
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
    console.log(err);
  });
};

start();
