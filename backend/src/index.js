
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
dotenv.config();


const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: '50mb' }));        // here we increase the limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
server.listen(PORT, ()=>{
    console.log("server is running on port:" + PORT);
    connectDB();
});
