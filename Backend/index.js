import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

import path from 'path';

import { authRoute } from "./router/authRouter.js";
import { connectDB } from "./db/database.js";
import { messageRoute } from "./router/messageRoute.js";
import { app, server } from "./utils/socket.js";


const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))

app.use("/api/auth", authRoute);

app.use("/api/messages", messageRoute);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../Chat_Frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Chat_Frontend", "dist", "index.html"))
  })
}

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
  });
});
