import Reservation from "../../models/reservation.js";

const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            });
        }

        if (reservation.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: "Reservation is already cancelled"
            });
        }

        // Check if reservation can be cancelled (e.g., not too close to reservation time)
        // const reservationDate = new Date(reservation.date);
        // const now = new Date();
        // const hoursUntilReservation = (reservationDate - now) / (1000 * 60 * 60);

        // if (hoursUntilReservation < 24) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Reservation can only be cancelled at least 24 hours in advance"
        //     });
        // }

        reservation.status = 'cancelled';
        await reservation.save();

        return res.status(200).json({
            success: true,
            message: "Reservation cancelled successfully"
        });
    } catch (error) {
        console.error("Error in cancelReservation:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export default cancelReservation;