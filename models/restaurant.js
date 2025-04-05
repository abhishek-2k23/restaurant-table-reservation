import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});

const operatingHoursSchema = new mongoose.Schema({
    day: {
        type: Number, // 0-6 (Sunday-Saturday)
        required: true
    },
    openTime: {
        type: String, // Format: "HH:mm"
        required: true
    },
    closeTime: {
        type: String, // Format: "HH:mm"
        required: true
    }
});

const restaurantSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true,
        unique: true,
    },
    location: {
        address: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    cuisine: [{
        type: String, 
        required: true
    }],
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    tables: [tableSchema],
    operatingHours: [operatingHoursSchema],
    minimumBookingTime: {
        type: Number, // in minutes
        default: 30
    },
    maximumBookingTime: {
        type: Number, // in minutes
        default: 120
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes for better query performance
restaurantSchema.index({ "location.latitude": 1, "location.longitude": 1 });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ isActive: 1 });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;