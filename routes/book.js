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
    let equipment_id = req.query.id;
    let user_email = req.query.email;
    let rent_date = req.query.rent_date;
    var sql = `SELECT * FROM rented WHERE equipment_id=? AND user_email=? AND rent_date=?`;
    // var sql = `SELECT * FROM rented WHERE equipment_id=? AND user_email=?`;

    console.log("ID: ", equipment_id);
    console.log("Email: ", user_email);
    console.log("Rent date: ", rent_date);

    db.all(sql,
        equipment_id,
        user_email,
        rent_date,
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


router.post("/", (req, res) => {
    console.log("Booking");
    // console.log(res.req.body);
    var equipment_id = res.req.body.id;
    var equipment_name = res.req.body.equipment;
    var user_email = res.req.body.user;
    var status = res.req.body.status;
    var rent_date = res.req.body.rent_date;
    console.log("ID: ", equipment_id);
    console.log("Equipment: ", equipment_name);
    console.log("User: ", user_email);
    console.log("Status: ", status);
    console.log("Date: ", rent_date);
    var sql = `INSERT INTO rented (equipment_id, equipment_name, user_email, rent_date, status) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql,
        equipment_id,
        equipment_name,
        user_email,
        rent_date,
        status, (err) => {
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
                    message: "Booking succesfully added."
                }
            });
        }
    );
});

module.exports = router;
