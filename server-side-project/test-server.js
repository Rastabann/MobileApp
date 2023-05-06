const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5500;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Use socket.id as the unique user ID
  socket.emit("connected", socket.id);

  socket.on("marker", (marker) => {
    socket.broadcast.emit("marker", marker);
  });

  socket.on("removeMarker", (marker) => {
    socket.broadcast.emit("removeMarker", marker);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
