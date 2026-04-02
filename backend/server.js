const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Import the Blueprint we just created

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
// We will replace this string with your REAL database link in the next step
const MONGO_URI = "mongodb+srv://surakshyakhatri35_db_user:9860157500Sk%25@petcarevt.8cnopyk.mongodb.net/PetDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));


// --- ROUTES ---

// Test Route
app.get('/', (req, res) => {
    res.send('Pet Care Backend is Running!');
});

// Registration Route (The Frontend will talk to this!)
app.post('/register', async (req, res) => {
    try {
        // 1. Get data from the frontend
        const { fullName, dob, gender, email, phone, password } = req.body;

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // 3. Create a new user
        const newUser = new User({ fullName, dob, gender, email, phone, password });
        await newUser.save();

        // 4. Send success message
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- LOG IN ROUTE ---
app.post('/login', async (req, res) => {
    try {
        // We now accept the combined field from the frontend
        const { emailOrPhone, password } = req.body;

        // 1. Search the database for an exact match in EITHER the email OR phone column
        const user = await User.findOne({ 
            $or: [
                { email: emailOrPhone }, 
                { phone: emailOrPhone }
            ] 
        });
        
        if (!user) {
            return res.status(400).json({ message: "We cannot find an account with that email or phone number." });
        }

        // 2. Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password. Please try again." });
        }

        // 3. Success!
        res.status(200).json({ message: "Login successful!" });

    } catch (error) {
        res.status(500).json({ message: "Server error during login." });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});