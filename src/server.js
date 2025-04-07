const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Server configuration for Retail Assistant AI
app.use(express.static(path.join(__dirname)));

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Serve the chat interface
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, () => {
    console.log(`Retail Assistant AI Server running at http://localhost:${port}`);
});