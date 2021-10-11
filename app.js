const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const index = require('./routes/index');
const reports = require('./routes/reports');
const register = require('./routes/register');
const login = require('./routes/login');
const edit = require('./routes/edit');
const admin = require('./routes/admin');
const del = require('./routes/del');
const add = require('./routes/add');
const del2 = require('./routes/del2');
const history = require('./routes/history');
const users = require('./routes/users');

const app = express();
const port = 8833;

// const sqlite3 = require('sqlite3').verbose();
// const db = require("./db/database.js");

app.use(cors());

// const saltRounds = 10;
// const myPlaintextPassword = 'longandhardP4$w0rD';
// const hash = 'superlonghashedpasswordfetchedfromthedatabase';

// GzSdd485scQ/fUvPIHOsoJSEEE70VQIzLgyBekeBZJuv4Edc3vW4nADvh4gVNt16aIf905dsBs5YFOjYfgRh5w==

// const payload = { email: "user@example.com" };
// const secret = process.env.JWT_SECRET;
//
// const token = jwt.sign(payload, secret, { expiresIn: '1h'});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// db.close();



// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Add a route
app.use('/', index);
app.use('/reports', reports);
app.use('/reports/edit', edit);
app.use('/register', register);
app.use('/login', login);
app.use('/admin', admin);
app.use('/del', del2);
app.use('/add', add);
app.use('/edit', edit);
app.use('/history', history);
app.use('/users', users);



// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
