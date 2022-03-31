const express = require('express');
const router = express.Router();
const db = require("../db/database.js");

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
