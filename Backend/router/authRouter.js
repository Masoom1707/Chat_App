import express from "express";
import { checkUser, logIn, logOut, signUp, updateProfile } from "../controller/authController.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const authRoute = express.Router();

authRoute.post('/signup', signUp)

authRoute.post('/login',logIn)

authRoute.post('/logout', logOut)

authRoute.put('/update-profile', checkAuth, updateProfile)

authRoute.get('/check', checkAuth, checkUser)
