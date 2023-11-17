'use strict'

const dbService = require("./../services/db.service.js");

module.exports = function (server) {
  server.io.on('connection', (socket) => {
    console.log(`${new Date()} - New connection ${socket.id}`);

    // Listening for chat event
    socket.on("chat", function (data) {
      dbService.addMessage(data);
      server.io.sockets.emit("chat", data);
    });

    // Listening for typing event
    socket.on("typing", function (data) {
      server.io.sockets.emit("typing", data);
      socket.broadcast.emit("typing", data);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
};

