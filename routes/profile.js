const express = require('express');
const router = express.Router();

const requireAuth = (req, res, next) => {
    if(req.session.userID) {
        next();
    }
    else {
        res.redirect('/');
    }
}
router.get('/', requireAuth, (req, res) => {
    res.render('profile', {pageTitle: 'Profil'})
})

module.exports = router;