const mongoose = require('mongoose');

// Medical Record Schema
const MedicalRecordSchema = new mongoose.Schema({
    petID: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    
    // Record type: Vaccine, Surgery, Checkup, Dental, etc.
    type: { type: String, enum: ['Vaccine', 'Surgery', 'Checkup', 'Dental', 'Medication', 'Other'], required: true },
    
    description: { type: String, required: true }, // e.g., "Rabies Booster", "Tooth Cleaning", etc.
    
    dateAdministered: { type: Date, required: true },
    
    // Next due date for recurring vaccines/checkups
    nextDueDate: { type: Date },
    
    // Track if the record is completed or pending
    status: { type: String, enum: ['Completed', 'Pending'], default: 'Completed' },
    
    // Veterinarian notes
    notes: { type: String },
    
    // Veterinary clinic/doctor info
    vetName: { type: String },
    vetClinic: { type: String },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
