require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("cookie-session");
const connecDB = require("./db/connectDB");
const errorHandler = require("./middlewares/errorHandler");
const { default: mongoose } = require("mongoose");

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
app.use(session({ secret: "Do Not Reveal The Password" }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    // the first parameter is an optional object with options
    {
      // when using the local strategy you MUST name your keys usernameField and passwordField.
      usernameField: "username",
      passwordField: "secret",
      passReqToCallback: true,
      // by default this option is set to false, but when specified to true, the first parameter of the verify callback will be the request object. This is quite useful if you want to see if your application has multiple strategies and you want to see if a user is already logged in with an existing strategy,
    },
    function verifyCallback(req, username, Password, done) {}
  )
);
console.log("here");
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

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
