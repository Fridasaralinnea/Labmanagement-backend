const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const db = require("../db/database.js");
const bcrypt = require('bcryptjs');

/* POST to register new user. */
router.post(
    "/",
    body('email').isEmail(),
    (req, res) => {
    // console.log(req);
    var email = req.body.email;
    var password = req.body.password;
    var role = "student";
    const saltRounds = 10;

    if (!email) {
        return res.status(400).json({
            errors: {
                status: 400,
                title: "Bad Request",
                detail: "Email missing in request"
            }
        });
    }
    if (!password) {
        return res.status(400).json({
            errors: {
                status: 400,
                title: "Bad Request",
                detail: "Password missing in request"
            }
        });
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log("hash: ", hash);
        if (err) {
            console.log("bcrypt error");
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/register",
                    title: "bcrypt error",
                    detail: "bcrypt error"
                }
            });
        }
        db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
            email,
            hash,
            role, (err) => {
                if (err) {
                    console.log("db error");
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/register",
                            title: "Database error",
                            detail: err.message
                        }
                    });
                }
                return res.status(201).json({
                    data: {
                        msg: "New user succesfully registered"
                    }
                })
            });
    });
})


module.exports = router;
