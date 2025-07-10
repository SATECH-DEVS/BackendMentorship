import { register, login, logout, getUserData, editProfile } from "../controller/Auth.js";
import express from "express";
// Importing necessary modules and functions
const AuthRoutes = express.Router()

//user Registration Route
AuthRoutes.post("/register", register)
AuthRoutes.post("/login", login)
AuthRoutes.post("/logout",logout)
AuthRoutes.get("/getUserData/:id", getUserData)
AuthRoutes.put("/editProfile/:id", editProfile);
export default AuthRoutes