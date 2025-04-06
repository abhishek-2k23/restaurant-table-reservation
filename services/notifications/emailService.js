import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

export const sendReservationEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `"Restaurant Booking System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// Template for restaurant notification
export const getRestaurantNotificationTemplate = (reservation, user) => {
    return `
        <h2>New Reservation Alert</h2>
        <p>You have received a new reservation request:</p>
        <ul>
            <li>User Name: ${user.email.replace("@gmail.com", " ")}</li>
            <li>Date: ${reservation.date}</li>
            <li>Time: ${reservation.startTime} - ${reservation.endTime}</li>
            <li>Number of Guests: ${reservation.numberOfGuests}</li>
            <li>Table Number: ${reservation.tableNumber}</li>
            <li>Special Requests: ${reservation.specialRequests || 'None'}</li>
        </ul>
    `;
};

// Template for user notification
export const getUserNotificationTemplate = (reservation, restaurant) => {
    return `
        <h2>Reservation Confirmation</h2>
        <p>Your reservation has been confirmed:</p>
        <ul>
            <li>Restaurant: ${restaurant.name}</li>
            <li>Location: ${restaurant.location}</li>
            <li>Date: ${reservation.date}</li>
            <li>Time: ${reservation.startTime} - ${reservation.endTime}</li>
            <li>Number of Guests: ${reservation.numberOfGuests}</li>
            <li>Table Number: ${reservation.tableNumber}</li>
            <li>Contact: ${restaurant.contact}</li>
        </ul>
    `;
}; 