const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({ secret: "my secret " }));

app.get("/", (req, res) => {
  req.session.username = "js";
  res.json({ msg: "session is created" });
});
app.get("/get-session", (req, res) => {
  res.json({ msg: `your session's username ${req.session.username}` });
});

app.get("/count", (req, res) => {
  if (req.session.sessionId) {
    req.session.sessionId++;
    res.json({ msg: `user visited ${req.session.sessionId} time` });
  } else {
    req.session.sessionId = 1;
    res.json({ msg: "user visited first time" });
  }
});

app.listen(4000, () => {
  console.log(`app is listenong to the port ${4000}... `);
});
