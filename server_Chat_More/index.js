
      // Import necessary modules

import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
// import initializeSocket from './socketHandler.js'; // Import the handler
import { database } from './config/database.js';
import  userRouter  from './routes/userRoutes.js';
import  messageRouter  from './routes/messageRoutes.js';
import { Server } from 'socket.io'; // Import the Server class from socket.io

dotenv.config();


        // Create the Express app and the HTTP server
const app = express();
const server = http.createServer(app); // Create an HTTP server from the Express app


        //initialize socket.io server
export const io = new Server(server, {
    cors: {
        origin: "*",  // Allow all origins for simplicity; adjust as needed for security
    },
});

        //store online users
export const userSocketMap = {}; // { userId : socketId }

        //socket.io connection handler
io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        console.log("User Connected", userId);

        if(userId) userSocketMap[userId] = socket.id; // Store the mapping of userId to socketId
    
        //Emit online users to all connected clients
        io.emit("online-users", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("User Disconnected", userId);
            if(userId) delete userSocketMap[userId]; // Remove the user from the map on disconnect

            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
});


        // middlewares
app.use(express.json()); // This line parses incoming JSON requests
// app.use(express.json({limit:"4mb"}));  //middleware to parse json request body
app.use(cors());  // Enable CORS for all routes


        // def route
app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:'Your server is up and running...suman',
    });
});
        // routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

        //database connection
database(); 


        // server ko run krne ke liye
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running at port- ${PORT}`);
})










// --- Initialize Socket.IO Logic ---
// initializeSocket(io); // Pass the 'io' instance to your handler

// Make io accessible to our routes
// app.set('socketio', io); 

// const userRoutes = require("../routes/User");
// const profileRoutes = require("../routes/Profile");
// const paymentRoutes = require("../routes/Payments");
// const courseRoutes = require("../routes/Course");
// import demoRoutes from "../routes/demoRoutes.js";



// const cookiesParser = require("cookie-parser");

// const {cloudinartConnect} = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");







// app.use(cookiesParser());


// app.use(
//     fileUpload({
//         userTempFiles:true,
//         tempFileDir:"/tmp",
//     })
// )

// cloudinary connection
// cloudinaryConnect();

// routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1", demoRoutes);

// def route



