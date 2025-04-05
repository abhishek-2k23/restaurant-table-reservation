import Restaurant from "../../models/restaurant.js";
import { validationResult } from 'express-validator';

const addRestaurant = async (req, res) => {
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
            id,
            name,
            location,
            cuisine,
            contact,
            tables,
            operatingHours,
            minimumBookingTime,
            maximumBookingTime
        } = req.body;

        // Check if restaurant with same id or name already exists
        const existingRestaurant = await Restaurant.findOne({
            $or: [
                { id: id },
                { name: name }
            ]
        });

        if (existingRestaurant) {
            return res.status(409).json({
                success: false,
                message: "Restaurant with this ID or name already exists"
            });
        }

        // Validate operating hours
        if (!Array.isArray(operatingHours) || operatingHours.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Operating hours are required"
            });
        }

        // Validate each operating hour entry
        for (const hour of operatingHours) {
            if (hour.day < 0 || hour.day > 6) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid day in operating hours"
                });
            }

            if (!isValidTimeFormat(hour.openTime) || !isValidTimeFormat(hour.closeTime)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid time format in operating hours"
                });
            }
        }

        // Validate tables
        if (!Array.isArray(tables) || tables.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one table is required"
            });
        }

        // Validate each table
        const tableNumbers = new Set();
        for (const table of tables) {
            if (tableNumbers.has(table.tableNumber)) {
                return res.status(400).json({
                    success: false,
                    message: "Duplicate table numbers are not allowed"
                });
            }
            tableNumbers.add(table.tableNumber);

            if (table.capacity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Table capacity must be at least 1"
                });
            }
        }

        // Validate booking time constraints
        if (minimumBookingTime && maximumBookingTime) {
            if (minimumBookingTime >= maximumBookingTime) {
                return res.status(400).json({
                    success: false,
                    message: "Minimum booking time must be less than maximum booking time"
                });
            }
        }

        // Validate location coordinates
        if (!isValidLatitude(location.latitude) || !isValidLongitude(location.longitude)) {
            return res.status(400).json({
                success: false,
                message: "Invalid latitude or longitude"
            });
        }

        // Create new restaurant
        const newRestaurant = new Restaurant({
            id,
            name,
            location,
            cuisine,
            contact,
            tables,
            operatingHours,
            minimumBookingTime: minimumBookingTime || 30,
            maximumBookingTime: maximumBookingTime || 120
        });

        // Save restaurant to database
        const savedRestaurant = await newRestaurant.save();

        return res.status(201).json({
            success: true,
            message: "Restaurant added successfully",
            data: savedRestaurant
        });

    } catch (error) {
        console.error("Error in addRestaurant:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Helper functions
function isValidTimeFormat(time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
}

function isValidLatitude(lat) {
    const num = parseFloat(lat);
    return !isNaN(num) && num >= -90 && num <= 90;
}

function isValidLongitude(lng) {
    const num = parseFloat(lng);
    return !isNaN(num) && num >= -180 && num <= 180;
}

export default addRestaurant; 