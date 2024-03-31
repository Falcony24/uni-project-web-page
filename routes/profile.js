var express = require('express');
const database = require("../database");
var router = express.Router();

router.get('/', database.requireAuth, (req, res, next) => {
    res.render('profile', {pageTitle: 'Profil'})
})

module.exports = router;