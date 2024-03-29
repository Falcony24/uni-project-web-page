var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('profile', {pageTitle: 'Profil'})
})

module.exports = router;