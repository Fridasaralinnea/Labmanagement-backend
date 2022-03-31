const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const db = require("../db/database.js");
const url = require('url');
const querystring = require('querystring');


router.get("/", (req, res) => {
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
        res.json({ data: rows });
    })
});


router.post(
    "/",
    body('name').trim(),
    body('amount').trim(),
    (req, res) => {
    console.log(res.req.body);
    var id = res.req.body.id;
    var name = res.req.body.name;
    var amount = res.req.body.amount;
    var sql = `UPDATE equipment SET name=?, amount=? WHERE id=?`;

    if (!name || !amount) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/reports/edit",
                title: "Name or amount missing",
                detail: "Name or amount missing"
            }
        });
    }
    db.run(sql, name, amount, id, (err) => {
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
                    message: "Info succesfully edited."
                }
            });
        }
    );
});

module.exports = router;
