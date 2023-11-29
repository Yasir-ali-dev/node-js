const express = require("express");
const { createServer } = require("http");
const app = express();
const path = require("path");
const httpServer = createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);
const option = {
  root: path.join(__dirname),
};

app.get("/", (req, res) => {
  res.sendFile("app.html", option);
});
// default namespace takes / route

let users = 0;
io.on("connection", (socket) => {
  console.log("user is connected");

  /* Testing namespace 
  socket.emit("test", { msg: "testing with namespace" }, (response) => {
    console.log(response.status);
  });
  */

  socket.join("room-1");
  socket.join("new-room");
  //   io.in("room-1").emit(
  //     "connectedRoom",
  //     "welcome to room 1 " + " by " + ++users + " users"
  //   );

  io.sockets.except("room-1").emit("new", "welcome to new room!");

  socket.on("disconnect", (socket) => {
    console.log("user is disconnected");
    users--;
  });
});

httpServer.listen(4000, () => {
  console.log(`app is listening to the port ${4000}`);
});
