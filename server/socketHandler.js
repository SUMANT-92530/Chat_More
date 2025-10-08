function initializeSocket(io) {
  // All your event listeners go inside the 'connection' event
  io.on('connection', (socket) => {
    console.log(`🔌 A user connected: ${socket.id}`);

    // Handle chat messages
    socket.on('chat message', (msg) => {
      console.log(`💬 Message from ${socket.id}: ${msg}`);
      io.emit('chat message', { user: socket.id, text: msg });
    });

    // Handle user joining a room
    socket.on('join room', (roomName) => {
      socket.join(roomName);
      console.log(`🚪 User ${socket.id} joined room: ${roomName}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });
}

module.exports = initializeSocket;