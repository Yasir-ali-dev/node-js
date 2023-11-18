const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "my secret ",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());

/*
app.get("/", (req, res) => {
  req.session.username = "js";
  res.json({ msg: "session is created", session: `${req.session.username}` });
});
app.get("/get-session", (req, res) => {
  res.json({ msg: `your session's username ${req.session.username}` });
});
*/

/*
app.get("/count", (req, res) => {
  if (req.session.sessionId) {
    req.session.sessionId++;
    res.json({ msg: `user visited ${req.session.sessionId} time` });
  } else {
    req.session.sessionId = 1;
    res.json({ msg: "user visited first time" });
  }
});
*/

app.get("/", (req, res) => {
  if (req.session.authorized) {
    res.send(`<h1>${req.session.user}</h1>`);
  } else {
    res.send(" login first");
  }
});

app.get("/signout", (req, res) => {
  req.session.destroy();
  res.send(`<h1>logout successful</h1><h1>please login</h1>`);
});

app.get("/login", (req, res) => {
  req.session.user = "yasir";
  req.session.authorized = true;
  res.send(`<h1>login successfully ${req.session.user}</h1>`);
});

app.listen(4000, () => {
  console.log(`app is listenong to the port ${4000}... `);
});
