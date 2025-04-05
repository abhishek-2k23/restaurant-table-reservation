import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tableNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, // Format: "HH:mm"
        required: true
    },
    endTime: {
        type: String, // Format: "HH:mm"
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    specialRequests: {
        type: String,
        default: ''
    },
    notificationSent: {
        confirmation: {
            type: Boolean,
            default: false
        },
        reminder: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

// Indexes for better query performance
reservationSchema.index({ restaurantId: 1, date: 1, startTime: 1 });
reservationSchema.index({ userId: 1, date: 1 });
reservationSchema.index({ status: 1 });

// Virtual for duration in minutes
reservationSchema.virtual('duration').get(function() {
    const start = new Date(`1970-01-01T${this.startTime}`);
    const end = new Date(`1970-01-01T${this.endTime}`);
    return (end - start) / (1000 * 60);
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation; 