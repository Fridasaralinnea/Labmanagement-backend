const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
const url = require('url');
const querystring = require('querystring');
// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;

/* GET */
router.get("/", (req, res) => {
    console.log("GETTING BOOKINGS!");
    let user_email = req.query.email;
    var sql = `SELECT * FROM rented WHERE user_email=?`;

    console.log("Email: ", user_email);

    db.all(sql,
        user_email,
        (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/edit",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        console.log(rows);
        res.json({ data: rows });
    })
});


router.get("/equipment", (req, res) => {
    let id = req.query.id;
    var sql = `SELECT * FROM equipment WHERE id=?`;

    console.log(id);

    db.get(sql, id, (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/edit",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json(rows);
    })
});


router.post("/pickup", (req, res) => {
    console.log("Pick up equipment");
    // console.log(res.req.body);
    var id = res.req.body.id;
    var status = res.req.body.status;
    console.log("ID: ", id);
    console.log("Status: ", status);
    var sql = `UPDATE rented SET status=? WHERE id=?`;

    db.run(sql,
        status,
        id, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports/edit",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            return res.status(201).json({
                data: {
                    message: "Equipment succesfully picked up."
                }
            });
        }
    );
});


router.post("/return", (req, res) => {
    console.log("Return equipment");
    var id = res.req.body.id;
    console.log("ID: ", id);
    var sql = `DELETE FROM rented WHERE id=?`;

    db.all(sql,
        id, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports/edit",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }
            return res.status(201).json({
                data: {
                    message: "Equipment succesfully returned."
                }
            });
        }
    );
});

module.exports = router;
