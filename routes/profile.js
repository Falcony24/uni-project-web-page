const express = require('express');
const database = require("../database");
const router = express.Router();

router.get('/', database.requireAuth, (req, res) => {
    res.render('profile', {pageTitle: 'Profil'})
})

module.exports = router;