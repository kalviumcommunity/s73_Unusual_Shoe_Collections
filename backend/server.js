require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Make sure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

let dbStatus = 'Disconnected';

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        dbStatus = 'Connected';
        console.log('MongoDB connected successfully.');
    } catch (error) {
        dbStatus = 'Error';
        console.error('MongoDB connection failed:', error);
    }
}

// Call the DB connection function
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Mount routes with /api prefix (e.g., /api/items/:id)
app.use('/api', routes);

// Health check route
app.get('/', (req, res) => {
    res.send(`<h1>Server is running<br/>📡 DB Connection Status: ${dbStatus}</h1>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
