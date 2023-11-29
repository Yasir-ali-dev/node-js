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
  users++;
  /* broadcast to all + itself 
  io.sockets.emit("broadcast", { message: `${users} users are connected` });
  */
  socket.emit("newMessage", { message: `welcome ${socket.id}` });
  socket.broadcast.emit("newMessage", { message: `${users} are connected` });

  /* socket.once() -- example
  socket.emit("first", "Hello, this is the first message");
  socket.emit("first", "Hello, this is the second message");
 */

  /*
  socket.on("update", (obj, callback) => {
    console.log(obj.item);
    callback({ status: true });
  });
  */

  // Function attached as a listener for 'custom event'
  function myListener1(msg) {
    console.log("Listener 1 triggered", msg);
  }
  // Another function attached as a listener for 'custom event'
  function myListener2(msg) {
    console.log("Listener 2 triggered", msg);
  }
  // Attach listeners to the 'custom event'
  socket.on("custom event", myListener1);
  socket.on("custom event", myListener2);
  // Later, remove all listeners for 'custom event'

  // Now, emit the event

  socket.on("disconnect", () => {
    users--;
    socket.broadcast.emit("newMessage", { message: `${users} are connected` });
    socket.removeAllListeners("custom event");
  });
});

httpServer.listen(4000, (req, res) => {
  console.log(`app is listening to the port 4000`);
});
