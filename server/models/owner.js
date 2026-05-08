import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
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
    // Array to store all turfs owned by this owner
    ownedTurfs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turf'  // Reference to your Turf model
    }],
    // Optional: You can add more owner-specific fields
    phone: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending'],
        default: 'active'
    }
});

export default mongoose.model('Owner', ownerSchema);