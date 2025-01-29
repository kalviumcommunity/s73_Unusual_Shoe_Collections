const express = require('express')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    res.json({
        message: "Pong",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})