import express from "express";
const router = express.Router();
import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";

router.post('/register-user', register);
router.post('/login-user', login);

export default router;