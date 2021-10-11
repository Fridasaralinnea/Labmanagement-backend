const express = require('express');
const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
// const { body } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;

/* GET equipment. */
router.post("/", (req, res) => {
    console.log("ADD!!!!!");
    var name = req.body.name;
    var amount = req.body.amount;
    var stock = amount;
    var sql = `INSERT INTO equipment (name, amount, stock) VALUES (?, ?, ?)`;

    db.all(`INSERT INTO equipment (name, amount, stock) VALUES (?, ?, ?)`,
        name,
        amount,
        stock, (err) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/admin",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        console.log("Added new equipment");
        return res.status(201).json({
            data: {
                msg: "Added new equipment"
            }
        })
    })
});


module.exports = router;
