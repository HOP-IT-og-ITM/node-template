const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bcrypt = require('bcrypt');


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


app.post('/ny-bruker', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    fs.readFile('data.json', 'utf8', (err, fileData) => {

        const jsonData = fileData ? JSON.parse(fileData) : [];

        jsonData.push(newUser);

        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (writeErr) => {
            res.redirect('/');
        });
    });
});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});