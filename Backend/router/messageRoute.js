import express from "express";
import { getMessages, getUserData, sendMessage } from "../controller/messageController.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const messageRoute = express.Router();

messageRoute.get("/users", checkAuth, getUserData);

messageRoute.get("/:id", checkAuth, getMessages);

messageRoute.post("/send/:id", checkAuth, sendMessage);
