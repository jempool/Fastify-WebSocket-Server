'use strict';

const dbService = require('./../services/db.service.js');
const { WEBSOCKETS_CHAT_EVENT, WEBSOCKETS_TYPING_EVENT } = require('./../utils/constants.js');

module.exports = async function (server) {
  server.io.on('connection', (socket) => {
    console.log(`${new Date()} - New connection ${socket.id}`);

    // Listening for chat event
    socket.on(WEBSOCKETS_CHAT_EVENT, function (data) {
      dbService.addMessage(data);
      server.io.sockets.emit(WEBSOCKETS_CHAT_EVENT, data);
    });

    // Listening for typing event
    socket.on(WEBSOCKETS_TYPING_EVENT, function (data) {
      server.io.sockets.emit(WEBSOCKETS_TYPING_EVENT, data);
      socket.broadcast.emit(WEBSOCKETS_TYPING_EVENT, data);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
};

