const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("sending text with res.send();");
});

// Applications can have one "single route that provides many different kinds of responses depending" on the data that is passed in the URL. Dynamic values to be passed in the URL are called “URL parameters” and are stored in the params object which exists in request object given to us in our callback functions.

app.get("/instructors/:Id", (req, res) => {
  res.send(`instructor Id : ${req.params.Id}`);
});

const port = 4000;
app.listen(port, () => {
  console.log(`app is listening to the server ${port}`);
});
