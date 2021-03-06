const express = require('express');
const router = express.Router();
const db = require("../db/database.js");
const { body } = require('express-validator');

router.post("/", (req, res) => {
    console.log("DELETE!");
    var id = req.body.id;
    var sql = `DELETE FROM equipment WHERE id=?`;

    db.run(`DELETE FROM equipment WHERE id=?`,
        id, (err) => {
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
        console.log("Deleted equipment");
        return res.status(201).json({
            data: {
                msg: "Deleted equipment"
            }
        })
    })
});


module.exports = router;
