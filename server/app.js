// app.js
import express from 'express';
import emailRoutes from './routes/emailRoutes.js';
import smtpServer from './smtpServer.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Email routes
app.use('/api', emailRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (roomID) => {
        socket.join(roomID);
        console.log(`User ${socket.id} joined room ${roomID}`);
    });

    socket.on('offer', ({ signal, roomID }) => {
        socket.to(roomID).emit('offer', signal);
    });

    socket.on('answer', ({ signal, roomID }) => {
        socket.to(roomID).emit('answer', signal);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
// Start Express server
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
const smtpPort = 25;
// Start SMTP server
smtpServer.listen(smtpPort, () => {
    console.log(`SMTP server running on port ${smtpPort}`);
});
