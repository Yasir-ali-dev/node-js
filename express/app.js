const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// body-parser, which parses the “body” of the response.
// If your API is listening for any kind of request where data may be sent to the server via a POST, make sure you have bodyParser included and are using it to collect data inside of req.body.
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sending text with res.send();");
});

// Applications can have one "single route that provides many different kinds of responses depending" on the data that is passed in the URL.
// Dynamic values to be passed in the URL are called “URL parameters” and are stored in the params object which exists in request object given to us in our callback functions.
app.get("/instructors/:Id", (req, res) => {
  res.status(200).send(`instructor Id : ${req.params.Id}`);
});

// Adding a status code -> When our Express server issues an HTTP response, there will always be an accompanying HTTP status code
// Sending back JSON
app.get("/msg", (req, res) => {
  res.status(200).json({ message: "that's it!" });
});

const port = 4000;
app.listen(port, () => {
  console.log(`app is listening to the server ${port}`);
});
