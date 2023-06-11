import express from "express";
import * as userController from "../controllers/userController";
import { authMiddlewares } from "../middlewares/authMiddlewares";
const router = express.Router();

router.post("/auth", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/profile", authMiddlewares, userController.profileUser);

export default router;
