const express = require("express");
const http = require('http');
const { Server } = require("socket.io"); // Import the Server class from socket.io
const cors = require("cors");

const initializeSocket = require('./socketHandler'); // Import the handler

// Create the Express app and the HTTP server
const app = express();
const server = http.createServer(app); // Create an HTTP server from the Express app

// Initialize Socket.IO by passing it the server
// We also configure CORS to allow connections from our front-end URL
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

// --- Initialize Socket.IO Logic ---
initializeSocket(io); // Pass the 'io' instance to your handler

// Make io accessible to our routes
app.set('socketio', io); 

// const userRoutes = require("../routes/User");
// const profileRoutes = require("../routes/Profile");
// const paymentRoutes = require("../routes/Payments");
// const courseRoutes = require("../routes/Course");
const demoRoutes = require("./routes/demoRoutes");


const database = require("./config/database");
// const cookiesParser = require("cookie-parser");

// const {cloudinartConnect} = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// database connect
database.connect();

// middlewares
app.use(express.json());  //middleware to parse json request body
// app.use(cookiesParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

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
app.use("/api/v1", demoRoutes);

// def route

app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:'Your server is up and running...suman',
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at port- ${PORT}`);
})