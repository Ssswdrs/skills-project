import { Server } from 'socket.io';
import { jwtValidateSocket } from './middleware/authHandler.js';

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: '*' }
    });

    //ใช้ Middleware ตรวจสอบ JWT
    io.use(jwtValidateSocket);

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.id}`);

        // Broadcast message: ส่งข้อความถึงทุกคน
        socket.on('message', (data) => {
            console.log(`📩 Message from ${socket.user.id}:`, data);
            io.emit('message', { user: socket.user.id, text: data });
        });

        // Private message: ส่งข้อความถึง client คนเดียว
        socket.on('private-message', ({ recipientId, message }) => {
            if (!socket.user || !socket.user.id) {
                console.error('User not authenticated');
                return; // Exit early if the user is not authenticated
            }
        
            if (!recipientId || !message) {
                console.error('Missing recipientId or message');
                return; // Ensure both recipientId and message are provided
            }
        
            console.log(`📩 Private message from ${socket.user.id} to ${recipientId}:`, message);
        
            // Check if the recipient is connected
            const recipientSocket = io.sockets.sockets.get(recipientId);
            if (!recipientSocket) {
                console.error(`Recipient with ID ${recipientId} is not connected`);
                return;
            }
        
            // Emit the message to the recipient
            io.to(recipientId).emit('private-message', { user: socket.user.id, text: message });
        });
        

        // ระบบห้อง (Rooms)
        socket.on('join-room', (room) => {
            socket.join(room);
            console.log(`👥 User ${socket.user.id} joined room: ${room}`);
        });

        socket.on('leave-room', (room) => {
            socket.leave(room);
            console.log(`🚪 User ${socket.user.id} left room: ${room}`);
        });

        socket.on('room-message', ({ room, message }) => {
            console.log(`📢 Room ${room} message from ${socket.user.id}:`, message);
            io.to(room).emit('room-message', { user: socket.user.id, text: message });
        });

        // แจ้งเตือนเมื่อผู้ใช้ disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user.id}`);
        });
    });

    return io;
};
