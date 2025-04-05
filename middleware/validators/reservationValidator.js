import { body } from 'express-validator';

const reservationValidator = [
    body('restaurantId')
        .notEmpty()
        .withMessage('Restaurant ID is required')
        .isMongoId()
        .withMessage('Invalid restaurant ID'),

    body('tableNumber')
        .notEmpty()
        .withMessage('Table number is required')
        .isString()
        .withMessage('Table number must be a string'),

    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Invalid date format'),

    body('startTime')
        .notEmpty()
        .withMessage('Start time is required')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Invalid start time format (HH:mm)'),

    body('endTime')
        .notEmpty()
        .withMessage('End time is required')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Invalid end time format (HH:mm)')
        .custom((endTime, { req }) => {
            if (endTime <= req.body.startTime) {
                throw new Error('End time must be after start time');
            }
            return true;
        }),

    body('numberOfGuests')
        .notEmpty()
        .withMessage('Number of guests is required')
        .isInt({ min: 1 })
        .withMessage('Number of guests must be at least 1'),

    body('specialRequests')
        .optional()
        .isString()
        .withMessage('Special requests must be a string')
];

export default reservationValidator; 