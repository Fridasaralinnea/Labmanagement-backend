const express = require('express');
const router = express.Router();
const db = require("../db/database.js");

router.get("/", (req, res) => {
    var sql = `SELECT * FROM equipment`;

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
