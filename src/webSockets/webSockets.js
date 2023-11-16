'use strict'

module.exports = function (server) {
    server.io.on('connection', (socket) => {
        console.log(`${new Date()} - New connection ${socket.id}`);

        // Listening for chat event
        socket.on('chat', (data) => {
            // dbService.addMessage(data);
            socket.emit('chat', data);
        });

        // Listening for typing event
        socket.on("typing", function (data) {
            socket.emit("typing", data);
            socket.broadcast.emit("typing", data);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });
};

