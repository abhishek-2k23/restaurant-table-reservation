import { body, check } from 'express-validator';

const restaurantValidator = [
    // Basic information validation
    body('id')
        .trim()
        .notEmpty()
        .withMessage('Restaurant ID is required babe')
        .isLength({ min: 3, max: 50 })
        .withMessage('Restaurant ID must be between 3 and 50 characters'),

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Restaurant name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Restaurant name must be between 3 and 100 characters'),

    // Location validation
    body('location.address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Address must be between 5 and 200 characters'),

    body('location.latitude')
        .trim()
        .notEmpty()
        .withMessage('Latitude is required'),

    body('location.longitude')
        .trim()
        .notEmpty()
        .withMessage('Longitude is required'),

    // Cuisine validation
    body('cuisine')
        .isArray({ min: 1 })
        .withMessage('At least one cuisine type is required')
        .custom((value) => {
            if (!value.every(item => typeof item === 'string' && item.length > 0)) {
                throw new Error('All cuisine types must be non-empty strings');
            }
            return true;
        }),

    // Contact validation
    body('contact.phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^\+?[1-9]\d{1,14}$/)
        .withMessage('Invalid phone number format'),

    body('contact.email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    // Tables validation
    body('tables')
        .isArray({ min: 1 })
        .withMessage('At least one table is required')
        .custom((value) => {
            if (!value.every(table => 
                typeof table.tableNumber === 'string' && 
                table.tableNumber.length > 0 &&
                typeof table.capacity === 'number' &&
                table.capacity > 0
            )) {
                throw new Error('Invalid table data format');
            }
            return true;
        }),

    // Operating hours validation
    body('operatingHours')
        .isArray({ min: 1 })
        .withMessage('At least one operating hour entry is required')
        .custom((value) => {
            if (!value.every(hour => 
                typeof hour.day === 'number' &&
                hour.day >= 0 &&
                hour.day <= 6 &&
                typeof hour.openTime === 'string' &&
                typeof hour.closeTime === 'string'
            )) {
                throw new Error('Invalid operating hours format');
            }
            return true;
        }),

    // Booking time validation
    body('minimumBookingTime')
        .optional()
        .isInt({ min: 15, max: 120 })
        .withMessage('Minimum booking time must be between 15 and 120 minutes'),

    body('maximumBookingTime')
        .optional()
        .isInt({ min: 30, max: 240 })
        .withMessage('Maximum booking time must be between 30 and 240 minutes')
];

export default restaurantValidator; 