var express = require('express');
var router = express.Router();

/* Home page */
router.get('/', function(req, res) {
    const data = {
        title: "Welcome",
        info: "Labmanagement"
    };

    res.json(data);
});

module.exports = router;
