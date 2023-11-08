const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const morgan = require("morgan");

const userRouter = require("./routes/user-routes");

// Middleware functions are functions that have access (req), (res), and the next function in the application’s request-response cycle.

//1. Make changes to the request and the response objects (customize a flash message or information to be sent to the user)
//2. End the request-response cycle (if you are not logged in redirect somewhere else)
//3. Call the next middleware in the stack.

// Middleware is code that gets run in between the request and the response. We’ve seen some examples of middleware already like body-parser, but
// we can write our own middleware as well! We will also be using our own custom middleware to configure the express router and handle errors.
// To include middleware we use the app.use function.

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// on every request the middleware runs
// app.use((req, res, next) => {
//   console.log("middleware just runs!!");
//   return next();
// });

// run on every
app.use("/products", (req, res, next) => {
  console.log("products middleware just runs!!");
  return next();
});
app.use("/users", userRouter);

// catch 404 and forward to error
// app.use((err, req, res, next) => {
//   err = new Error("Page Not Found");
//   err.status = 404;
//   console.log("Err");
//   return res.status(err.status).json({ message: err });
// });

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  return res.json({ messsage: err.message }); // pass the error to the next piece of middleware
});

const port = 7000;
app.listen(port, () => {
  console.log(`app is listening to the port ${port}`);
});
