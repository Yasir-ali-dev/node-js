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

io.on("connection", (socket) => {
  console.log("user is connected");
  setTimeout(() => {
    // socket.send("A message is event by predefined method");
    socket.emit("customEvent", {
      description: "message is created from server-side ",
    });
  }, 3000);
  socket.on("clientMessage", (data) => {
    console.log(data.message);
  });
  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

httpServer.listen(4000, (req, res) => {
  console.log(`app is listening to the port 4000`);
});
