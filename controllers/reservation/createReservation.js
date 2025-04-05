import Reservation from "../../models/reservation.js";
import Restaurant from "../../models/restaurant.js";
import { validationResult } from 'express-validator';

const createReservation = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const {
            restaurantId,
            tableNumber,
            date,
            startTime,
            endTime,
            numberOfGuests,
            specialRequests
        } = req.body;

        const userId = req.user.id; 

        // Check if restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        // Check if table exists in restaurant
        const table = restaurant.tables.find(t => t.tableNumber === tableNumber);
        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found in restaurant"
            });
        }

        // Check table capacity
        if (table.capacity < numberOfGuests) {
            return res.status(400).json({
                success: false,
                message: "Table capacity is less than number of guests"
            });
        }

        // Validate date and time
        const reservationDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (reservationDate < today) {
            return res.status(400).json({
                success: false,
                message: "Cannot make reservation for past dates"
            });
        }

        // Check if restaurant is open on that day
        const dayOfWeek = reservationDate.getDay();
        const operatingHours = restaurant.operatingHours.find(oh => oh.day === dayOfWeek);
        
        if (!operatingHours) {
            return res.status(400).json({
                success: false,
                message: "Restaurant is closed on selected date"
            });
        }

        // Check if reservation time is within operating hours
        if (startTime < operatingHours.openTime || endTime > operatingHours.closeTime) {
            return res.status(400).json({
                success: false,
                message: "Reservation time is outside operating hours"
            });
        }

        // Check for existing reservations (also checking time overlaps)
        const existingReservation = await Reservation.findOne({
            restaurantId,
            tableNumber,
            date: reservationDate,
            $or: [
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gt: startTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lt: endTime } },
                        { endTime: { $gte: endTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: startTime } },
                        { endTime: { $lte: endTime } }
                    ]
                }
            ],
            status: { $in: ['pending', 'confirmed'] }
        });

        if (existingReservation) {
            return res.status(409).json({
                success: false,
                message: "Table is already reserved for the selected time"
            });
        }

        // Create new reservation
        const newReservation = new Reservation({
            restaurantId,
            userId,
            tableNumber,
            date: reservationDate,
            startTime,
            endTime,
            numberOfGuests,
            specialRequests,
            status: 'confirmed' 
        });

        // Save reservation
        const savedReservation = await newReservation.save();

        // TODO: Send confirmation notification
        // sendConfirmationNotification(savedReservation);

        return res.status(201).json({
            success: true,
            message: "Reservation created successfully",
            data: savedReservation
        });

    } catch (error) {
        console.error("Error in createReservation:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default createReservation; 