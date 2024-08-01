const express = require('express');
const fs = require("fs");
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/profile');
});
router.post('/', (req, res) => {
    fs.readFile('database/users.json', 'utf8', (err, data) => {
        users = JSON.parse(data);
        username = req.body.username
        password = req.body.password

        users.forEach(user => {
            if((user.username === username) && (user.password === password)) {
                req.session.userID = user.id;
                res.redirect('/profile');
            }
        })
    })
})

module.exports = router;