require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

let dbStatus = 'Disconnected';

async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        dbStatus = 'Connected';
        console.log('MongoDB connected successfully.');
    } catch (error) {
        dbStatus = 'Error';
        console.error('MongoDB connection failed:', error);
    }
}

connectDB();

app.get('/', (req, res) => {
    res.send(`<h1>Database Connection Status: ${dbStatus}</h1>`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
