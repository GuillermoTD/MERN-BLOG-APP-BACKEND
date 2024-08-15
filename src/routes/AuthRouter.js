import { Router } from "express";
import { authenticateToken, Login, Signup } from "../controllers/auth.controller.js";

const router = Router()

router.post("/login",authenticateToken,Login)

router.post("/signup",Signup)


export default router

