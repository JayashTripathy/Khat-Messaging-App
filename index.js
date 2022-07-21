 require('dotenv').config();
 
 const express = require("express");
 const cors = require('cors');
 const mongoose = require('mongoose');
 const app = express();
 const userRoutes = require("./routes/userRoutes")
 const messageRoute = require("./routes/messageRoutes")
 const socket = require("socket.io")

 app.use(express.static('public/build'))
 app.use(cors());
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


const sever = app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on PORT..${process.env.PORT}`)
})

const io = socket(sever, {
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





