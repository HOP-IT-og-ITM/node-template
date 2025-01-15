const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();
const port = 3000;
const server = http.createServer(app);



// Setter public som root-mappe
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing til ulike filer, legg inn egne ved å kopiere en av app.get-funkjonene
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view', 'index.html'));
});



server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});