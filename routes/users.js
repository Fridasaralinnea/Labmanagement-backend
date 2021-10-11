const express = require('express');
const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
// const { body } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;

/* GET equipment. */
router.get("/", (req, res) => {
    var sql = `SELECT * FROM users`;

    db.all(sql, (err, rows) => {
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
        console.log(rows);
        res.json({ data: rows });
    })
});


module.exports = router;
