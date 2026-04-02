const mongoose = require('mongoose');

// Pet Profile Schema
const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true }, // Dog, Cat, Bird, etc.
    breed: { type: String, required: true },
    dob: { type: Date, required: true }, // Date of Birth
    ownerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Weight history for tracking health trends
    weightHistory: [
        {
            date: { type: Date, default: Date.now },
            value: { type: Number, required: true }, // in kg or lbs
            unit: { type: String, enum: ['kg', 'lbs'], default: 'kg' }
        }
    ],
    
    // Additional pet info
    microchipID: { type: String },
    photoURL: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', PetSchema);
