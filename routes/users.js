const express = require('express');
const router = express.Router();
const db = require("../db/database.js");

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


router.post("/", (req, res) => {
    console.log("Edit user role");
    // console.log(res.req.body);
    var user = res.req.body.user;
    var role = res.req.body.role;
    console.log("User: ", user);
    console.log("Role: ", role);
    var sql = `UPDATE users SET role=? WHERE email=?`;

    db.run(sql,
        role,
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
                    message: "User role succesfully edited."
                }
            });
        }
    );
});


module.exports = router;
