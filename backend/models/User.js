const mongoose = require('mongoose');

// This is the Blueprint for a User
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dob: { type: String, required: true },     // Date of Birth
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    // We can add pet data later!
});

module.exports = mongoose.model('User', UserSchema);