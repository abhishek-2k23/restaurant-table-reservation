import express from "express";
const router = express.Router();

//user
import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";

//reservation
import userAuthentication from "../middleware/validators/userAuthentication.js";
import reservationValidator from "../middleware/validators/reservationValidator.js";
import createReservation from "../controllers/reservation/createReservation.js";
import checkReservationDetails from "../controllers/reservation/checkReservationDetails.js";
import cancelReservation from "../controllers/reservation/cancelReservation.js";

//restaurant
import fetchRestaurantData from "../controllers/Restaurant/fetchRestaurantData.js";
import addRestaurant from "../controllers/restaurant/addRestaurant.js";

// User routes
router.post('/register-user', register);
router.post('/login-user', login);

// Restaurant routes
router.get('/restaurant', fetchRestaurantData);
router.post('/addRestaurant', reservationValidator,addRestaurant)

// Reservation routes
router.post('/reserve', userAuthentication, reservationValidator, createReservation);
router.get('/reservations', userAuthentication, checkReservationDetails );
router.put('/reservations/:id', userAuthentication, cancelReservation);

export default router;