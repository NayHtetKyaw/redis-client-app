import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();
const io = new Server(httpServer, {
  path: '/socketio',
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  io.emit('message', 'updateData');
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});