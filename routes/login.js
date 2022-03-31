"use strict";

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const jwtSecret = config.jwtSecret;

/* POST login user. */
router.post(
    "/",
    body('email').isEmail(),
    (req, res) => {
    console.log("Login route reached for enpoint '/' using POST method with email: ", req.body.email, " and password: ", req.body.password);

    var email = req.body.email;
    var pwd = req.body.password;
    var sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, email, (err, row) => {
        if (err || !row) {
            console.log("Email invalid");
             return res.status(400).json({
                 errors: {
                     status: 400,
                     title: "Email invalid",
                     detail: "Could not find user: " + email
                 }
            });
        }
        console.log("email: ", row.email);
        console.log("role: ", row.role);
        console.log("hash: ", row.password);

        bcrypt.compare(pwd, row.password, (err, valid) => {
            if (valid) {
                const payload = {
                    email: row.email,
                    role: row.role
                };
                const token = jwt.sign(payload, jwtSecret, {expiresIn: '1h'});
                console.log(row.email + " is logged in.")
                return res.status(200).json({
                        status: 200,
                        user: payload,
                        idToken: token,
                        expiresIn: 3600,
                        msg: "User succesfully logged in"
                });
            } else {
                console.log("Error during login");
                return res.status(400).json({
                    errors: {
                        status: 400,
                        title: "Login Error",
                        detail: "Error during login"
                    }
                });
            }
        });
    });

});


module.exports = router;
