import express from "express";
import userAuthentication from "../middleware/validators/userAuthentication.js";
import reservationValidator from "../middleware/validators/reservationValidator.js";
import createReservation from "../controllers/reservation/createReservation.js";
import checkReservationDetails from "../controllers/reservation/checkReservationDetails.js";
import cancelReservation from "../controllers/reservation/cancelReservation.js";

const router = express.Router();

// Create new reservation
router.post('/create', userAuthentication, reservationValidator, createReservation);

// Get user's reservations details
router.get('/my-reservations', userAuthentication, checkReservationDetails );

// Cancel reservation 
router.put('/cancel/:id', userAuthentication, cancelReservation);

export default router; 