import express from "express";
const router = express.Router();
import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";
import restaurantRouter from "./restaurant.js";
import reservationRouter from "./reservation.js";

// User routes
router.post('/register-user', register);
router.post('/login-user', login);

// Restaurant routes
router.use('/restaurant', restaurantRouter);

// Reservation routes
router.use('/reservation', reservationRouter);

export default router;