const mongoose = require('mongoose');

// Notification Schema
const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    
    // Notification type: vaccination_due, vaccination_overdue, appointment_reminder, etc.
    type: { 
        type: String, 
        enum: ['vaccination_due', 'vaccination_overdue', 'appointment_reminder', 'vaccination_completed', 'health_alert'],
        required: true 
    },
    
    title: { type: String, required: true },
    message: { type: String, required: true },
    
    // Related medical record
    medicalRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' },
    
    // Notification specifics
    vaccinationType: { type: String }, // e.g., "Rabies", "DHPP"
    dueDate: { type: Date },
    daysUntilDue: { type: Number },
    severity: { 
        type: String, 
        enum: ['info', 'warning', 'critical'],
        default: 'info'
    },
    
    // Read status
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    
    // Action tracking
    actionTaken: { type: Boolean, default: false },
    actionTakenAt: { type: Date },
    
    // Dismissal
    isDismissed: { type: Boolean, default: false },
    dismissedAt: { type: Date },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    
    // Expiration - notification auto-expires after 90 days
    expiresAt: { type: Date, default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) }
});

// TTL index for automatic deletion of expired notifications
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Notification', NotificationSchema);
