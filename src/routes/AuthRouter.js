import { Router } from "express";
import { authenticateToken, cookieJwtAuth, Login, Signup } from "../controllers/auth.controller.js";

const router = Router()

router.post("/login",Login)

router.post("/signup",Signup)


export default router

