import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    turf : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Turf", 
        required : true
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required : true

    },

    bookingDate : {
        type : String,
        required : true

    },
    
    bookedSlots : {
        type : [String],
        required : true
    },
    
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
});

export default mongoose.model('Booking', bookingSchema);