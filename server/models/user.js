import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    address: {
        type: String
    },
    favoriteSport: {
        type: String
    },
    phone: {
        type: Number
    },
    dob: {
        type: Date
    },

    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    }],

    totalBookings: {
        type: Number,
        default: "0"
    },
    loyaltyPoints: {
        type: Number,
        default: "1200"
    }
});

export default mongoose.model('User', userSchema);