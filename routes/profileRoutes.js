import express from "express";
import { getUserData, EditProfile } from "../controller/profile.js";
import authMiddleware from "../middleware/authmiddleware.js";
const profileRoutes = express.Router();

profileRoutes.get("/getUserData/:id",authMiddleware, getUserData);
profileRoutes.put("/editProfile/:id",authMiddleware,EditProfile);

export default profileRoutes;