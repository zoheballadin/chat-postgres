import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./controllers/auth.js";
import conversationRoutes from "./controllers/conversation.js";
import messageRoutes from "./controllers/message.js";
import userRoutes from "./controllers/users.js";
import "./models/relations.js";

import "./dbConnect.js";

const app = express();
const port = 5002;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    // credentials: "true"
  },
});

let users = [];
//array which stores the user id and socket id of all active users

const addUser = (uid, sid) => {
  !users.some((user) => user.userId == uid) &&
    users.push({ userId: uid, socketId: sid });
};

const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};

const removeUser = (sid) => {
  users = users.filter((user) => user.socketId != sid);
};

io.on("connection", (socket) => {
  console.log("user connected to socket");

  //after every connection, take user id and socket id and store in users array

  socket.on("addUser", (userId) => {
    console.log(userId)
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      console.log(receiverId)
    const user = getUser(receiverId);
    console.log(user)
   user && io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnected we remove the user from users array
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(port, () => {
  console.log("Listening on port ", port);
});
