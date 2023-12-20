import dbService from "../services/db.service";
import {
  WEBSOCKETS_CHAT_EVENT,
  WEBSOCKETS_TYPING_EVENT,
} from "../utils/constants";

export default function (server) {
  server.io.on("connection", (socket) => {
    console.log(`${new Date()} - New connection ${socket.id}`);

    // Listening for chat event
    socket.on(WEBSOCKETS_CHAT_EVENT, (data) => handleChatEvent(server, data));

    // Listening for typing event
    socket.on(WEBSOCKETS_TYPING_EVENT, (data) =>
      handleTypingEvent(server, socket, data)
    );

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });
}

const handleChatEvent = (server, data) => {
  dbService.addMessage(data);
  server.io.sockets.emit(WEBSOCKETS_CHAT_EVENT, data);
};

const handleTypingEvent = (server, socket, data) => {
  server.io.sockets.emit(WEBSOCKETS_TYPING_EVENT, data);
  socket.broadcast.emit(WEBSOCKETS_TYPING_EVENT, data);
};
