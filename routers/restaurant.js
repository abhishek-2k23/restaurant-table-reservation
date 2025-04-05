import express from "express";
import addRestaurant from "../controllers/restaurant/addRestaurant.js";
import restaurantValidator from "../middleware/validators/restaurantValidator.js";
import fetchRestaurantData from "../controllers/Restaurant/fetchRestaurantData.js";

const router = express.Router();

// Add new restaurant
router.post('/add', restaurantValidator, addRestaurant);
router.get('/fetchRestaurantData', fetchRestaurantData);

export default router; 