const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const db = require("../db/database.js");
const bcrypt = require('bcryptjs');

router.post("/", (req, res) => {
    console.log("DELETE!!");
    console.log(req);

    var id = req.body.id;
    var sql = `DELETE FROM equipment WHERE id=?`;

    console.log("Delete ",  id);

    if (!id) {
        return res.status(400).json({
            errors: {
                status: 400,
                title: "Bad Request",
                detail: "ID missing in request"
            }
        });
    }

    db.all(sql, id, (err) => {
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
                msg: "Equipment succesfully deleted"
            }
        });
    });
})


module.exports = router;
