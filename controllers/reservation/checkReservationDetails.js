import Reservation from "../../models/reservation.js";
import Restaurant from "../../models/restaurant.js";

const checkReservationDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find all reservations for the user and populate restaurant data
        const reservations = await Reservation.find({ userId })
            .populate({
                path: 'restaurantId',
                select: 'name location contact' 
            })
            .sort({ date: 1, startTime: 1 });

        // Formating the response data
        const formattedReservations = reservations.map(reservation => ({
            id: reservation._id,
            restaurant: {
                name: reservation.restaurantId.name,
                location: reservation.restaurantId.location,
                contact: reservation.restaurantId.contact
            },
            tableNumber: reservation.tableNumber,
            date: reservation.date,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            numberOfGuests: reservation.numberOfGuests,
            status: reservation.status,
            specialRequests: reservation.specialRequests
        }));

        return res.status(200).json({
            success: true,
            message: reservations.length ? 'Reservations found' : 'No reservations found',
            count: reservations.length,
            data: formattedReservations
        });

    } catch (error) {
        console.error('Error in checkReservationDetails:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching reservation details',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default checkReservationDetails;