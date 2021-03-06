const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const db = require("../db/database.js");
const url = require('url');
const querystring = require('querystring');

router.get("/", (req, res) => {
    let id = req.query.id;
    var sql = `SELECT * FROM equipment WHERE id=?`;

    console.log("ID: ", id);

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
        res.json({ data: rows });
    })
});

router.get("/history", (req, res) => {
    let id = req.query.id;
    var sql = `SELECT * FROM history WHERE equipment_id=?`;

    console.log("ID: ", id);

    db.all(sql, id, (err, rows) => {
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
        res.json(rows);
    })
});


router.post("/", (req, res) => {
    console.log("history add");
    var id = res.req.body.id;
    var user = res.req.body.user;
    var amount = res.req.body.amount;
    var action = res.req.body.action;
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let event_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log("ID: ", id);
    console.log("User: ", user);
    console.log("Date: ", event_date);
    console.log("Action: ", action);
    console.log("Amount: ", amount);
    var sql = `INSERT INTO history (event_date, equipment_id, action, amount, user_email) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql,
        event_date,
        id,
        action,
        amount,
        user, (err) => {
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
                    message: "History succesfully added."
                }
            });
        }
    );
});

module.exports = router;
