import { sendReservationEmail, getRestaurantNotificationTemplate, getUserNotificationTemplate } from './emailService.js';
import { sendReservationSMS, getUserSMSTemplate, getRestaurantSMSTemplate } from './smsService.js';

export const sendReservationNotifications = async (reservation, user, restaurant) => {
    try {
        console.log(reservation, user, restaurant);
        // Send email to restaurant
        if (restaurant.contact.email) {
            console.log(restaurant.contact.email);
            const restaurantEmailTemplate = getRestaurantNotificationTemplate(reservation, user);
            await sendReservationEmail(
                restaurant.contact.email,
                'New Reservation Alert',
                restaurantEmailTemplate
            );
        }

        // Send email to user
        if (user.email) {
            console.log(user.email);
            const userEmailTemplate = getUserNotificationTemplate(reservation, restaurant);
            await sendReservationEmail(
                user.email,
                'Reservation Confirmation',
                userEmailTemplate
            );
        }

        return true;
    } catch (error) {
        console.error('Error sending notifications:', error.message);
        return false;
    }
}; 