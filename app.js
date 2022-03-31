const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");

const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const edit = require('./routes/edit');
const admin = require('./routes/admin');
// const del = require('./routes/del');
const add = require('./routes/add');
const del = require('./routes/del');
const history = require('./routes/history');
const users = require('./routes/users');
const book = require('./routes/book');
const mybookings = require('./routes/mybookings');


const app = express();
const port = 8833;

app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Add a route
app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/admin', admin);
app.use('/del', del);
app.use('/add', add);
app.use('/edit', edit);
app.use('/history', history);
app.use('/users', users);
app.use('/book', book);
app.use('/mybookings', mybookings);

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
