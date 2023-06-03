import express from "express";
import * as userController from "../controllers/userController";
const router = express.Router();

router.post("/auth", userController.loginOn);
router.post("/register", userController.registerUser);

export default router;
