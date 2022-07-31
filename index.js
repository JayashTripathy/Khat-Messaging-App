 require('dotenv').config();
 const path = require("path")
const express = require("express");
 const cors = require('cors');
 const mongoose = require('mongoose');
 const app = express();
 const userRoutes = require("./routes/userRoutes")
 const messageRoute = require("./routes/messageRoutes")
 const socket = require("socket.io")
 
 app.use(cors({origin: "*"}))
 app.use(express.static('public/build'))
 
 
 app.use(express.json());
 
 app.use("/api/auth", userRoutes)
 app.use("/api/message", messageRoute)
 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("DB connected")
}).catch((err) => {
    console.log(err.message)
})

const PORT = process.env.PORT 
const server = app.listen(PORT , ()=> {
    console.log(`Server Started on PORT..${PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "*",
         credentials: true,
         
         
}
    
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
        
    })
    
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.msg)
        }
    })
})






