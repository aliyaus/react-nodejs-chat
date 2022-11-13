const {
    exitRoom,
    newUser,
    getIndividualRoomUsers
} = require('./helpers/userHelper');
const moment = require('moment')
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
app.use(cors())

const server = http.createServer(app);

// init socket.io with cors origin so that we only accept socket communication from our frontend
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const PORT = 5000 || process.env.PORT

// this block will run when a client connects to the server
io.on("connection", (socket) => {

    console.log(`user ${socket.id} connected!`)

    // here is where we define socket events and how we will respond when they are emitted
    socket.on("join_room", (data) => {

        socket.join(data.chatroom)

        const user = newUser(socket.id, data.username, data.chatroom);
        console.log(`${user.username}-${user.id} has joined room ${user.chatroom}`)

        socket.to(data.chatroom).emit('update_room_users', {
            chatroom: data.chatroom,
            users: getIndividualRoomUsers(data.chatroom)
        })

        socket.to(user.chatroom).emit("receive_message", {
            chatroom: user.chatroom,
            author: "server",
            message: `${user.username} has joined!`,
            timestamp: moment.now(),
        })
    })

    socket.on("send_message", (data) => {
        socket.to(data.chatroom).emit("receive_message", data);
    });

    socket.on("message_inprogress", (data) => {
        console.log(`${data.username} is typing!`)
    })

    socket.on("leave_room", (data) => {

        console.log(`user ${socket.id} disconnected!`)
        const user = exitRoom(socket.id)

        if (user) {
            socket.to(user.chatroom).emit("receive_message", {
                chatroom: user.chatroom,
                author: "server",
                message: `${user.username} has disconnected!`,
                timestamp: moment.now(),
            })
        }

        socket.to(data.chatroom).emit('update_room_users', {
            room: data.chatroom,
            users: getIndividualRoomUsers(data.chatroom)
        })
    })
})

server.listen(PORT, () => console.log(`react-nodejs-chat-backend is running on port ${PORT}`))