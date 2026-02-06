const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to read data from the HTML form
app.use(bodyParser.urlencoded({ extended: false }));

// 1. Setup MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'AUSTIN_DJ',           // Default is root
    password: 'dijai@12#21', // CHANGE THIS to your SQL password
    database: 'user_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database!');
});

// 2. Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Handle Form Submission (The POST request)
app.post('/submit', (req, res) => {
    const { username, email } = req.body; // Extract data from form fields

    const sql = "INSERT INTO users (username, email) VALUES (?, ?)";
    db.query(sql, [username, email], (err, result) => {
        if (err) {
            return res.status(500).send("Database Error: " + err.message);
        }
        res.send("<h1>Success!</h1><p>Data saved to SQL database.</p><a href='/'>Go Back</a>");
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});