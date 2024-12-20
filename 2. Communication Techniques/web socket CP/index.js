const express = require("express")
const { createServer } = require('node:http')
const { join } = require('node:path')

const { Server } = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

// Store active users and groups
const users = {}; // { userId: socketId }
const groups = {}; // { groupName: [socketIds] }

// Handle connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a user
    socket.on('join', (userId) => {
        users[userId] = socket.id;
        console.log(`${userId} joined with socket ${socket.id}`);
    });

    // Private message
    socket.on('privateMessage', ({ sender, receiver, message }) => {
        const receiverSocket = users[receiver];
        if (receiverSocket) {
            io.to(receiverSocket).emit('privateMessage', { sender, message });
        }
    });

    // Join a group
    socket.on('joinGroup', ({ userId, groupName }) => {
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(socket.id);
        socket.join(groupName);
        io.to(groupName).emit('groupMessage', { sender: 'System', message: `${userId} joined the group` });
    });

    // Group message
    socket.on('groupMessage', ({ groupName, sender, message }) => {
        io.to(groupName).emit('groupMessage', { sender, message });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Remove user from users and groups
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
        for (const groupName in groups) {
            groups[groupName] = groups[groupName].filter((id) => id !== socket.id);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
