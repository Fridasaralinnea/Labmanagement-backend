const express = require('express');
const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
// const { body } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;

/* GET Kmom01. */
router.get("/week/1", (req, res) => {
    var sql = `SELECT * FROM reports WHERE kmom = 'Kmom01'`;

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/week/1",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json({ data: rows[0] });
    })
});

/* GET Kmom02. */
router.get("/week/2", (req, res) => {
    var sql = `SELECT * FROM reports WHERE kmom = 'Kmom02'`;

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/week/2",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json({ data: rows[0] });
    })
});

/* GET Kmom03. */
router.get("/week/3", (req, res) => {
    var sql = "select * from reports where kmom = 'Kmom03'";

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/week/3",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json({ data: rows[0] });
    })
});

/* GET Kmom04. */
router.get("/week/4", (req, res) => {
    var sql = "select * from reports where kmom = 'Kmom04'";

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/week/4",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json({ data: rows[0] });
    })
});

/* GET Kmom05. */
router.get("/week/5", (req, res) => {
    var sql = "select * from reports where kmom = 'Kmom05'";

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/week/5",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json({ data: rows[0] });
    })
});

/* GET Kmom06. */
router.get("/week/6", (req, res) => {
    var sql = "select * from reports where kmom = 'Kmom06'";

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/week/6",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json({ data: rows[0] });
    })
});

/* GET Kmom10. */
router.get("/week/10", (req, res) => {
    var sql = "select * from reports where kmom = 'Kmom10'";

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/week/5",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json({ data: rows[0] });
    })
});


module.exports = router;
