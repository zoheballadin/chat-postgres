import express from "express";
import http from "http"
import { Server } from "socket.io";
import authRoutes from "./controllers/auth.js"
import conversationRoutes from "./controllers/conversation.js"
import messageRoutes from "./controllers/message.js"
import userRoutes from "./controllers/users.js"
import "./models/relations.js"
import session from "express-session";
import "./dbConnect.js";


const app = express();
const port = 5002;

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/conversation", conversationRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        // credentials: "true"
    }
})

let users = []

const addUser = (uid, sid) =>{
    !users.some(user => user.userId == uid) &&
        users.push({userId: uid, socketId: sid})
}

const getUser = userId =>{
    return users.find(user => user.userId === userId)
}

const removeUser = (sid) =>{
    users = users.filter(user => user.socketId != sid)
}

io.on("connection", socket =>{
    console.log("user connected to socket")

    socket.on("addUser", userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    })

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text})=>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId, text
        })
    })


    socket.on("disconnect", ()=>{
        console.log("user disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users)
    })
})


server.listen(port, ()=>{
    console.log("Listening on port ", port)
})
