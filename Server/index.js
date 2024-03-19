document.getElementById('btn-sign').addEventListener('click',function(){
    window.location.href='dashboard.html';
})
document.getElementById('report-stat').addEventListener('click',function(){
    window.location.href='reports.html';
})
document.getElementById('payroll-page"').addEventListener('click',function(){
    window.location.href='payroll.html';
})


const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)');
});

app.use(bodyParser.json());

// Endpoint for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }

        bcrypt.compare(password, row.password, (err, result) => {
            if (result) {
                return res.status(200).json({ message: 'Login successful' });
            } else {
                return res.status(401).json({ error: 'Incorrect password' });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});