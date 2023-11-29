const express = require("express");
const app = express();
const path = require("path");
const { createServer } = require("http");

const httpServer = createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);

app.get("/", (req, res) => {
  const option = {
    root: path.join(__dirname),
  };
  res.sendFile("index.html", option);
});

let users = 0;
io.on("connection", (socket) => {
  console.log("user is connected", socket.id);
  users++;
  /* broadcast to all + itself 
  io.sockets.emit("broadcast", { message: `${users} users are connected` });
  */
  socket.emit("newMessage", { message: `welcome ${socket.id}` });
  socket.broadcast.emit("newMessage", { message: `${users} are connected` });

  socket.on("disconnect", () => {
    users--;
    socket.broadcast.emit("newMessage", { message: `${users} are connected` });
  });
});

httpServer.listen(4000, (req, res) => {
  console.log(`app is listening to the port 4000`);
});
