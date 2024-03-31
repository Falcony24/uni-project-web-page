let express = require('express');
let router = express.Router();
let database = require('../database');
const sql = require('mysql');


router.post('/', (req, res) => {
    let username = sql.escape(req.body.username);
    let pass = sql.escape(req.body.password);

    try {
        database.con.query(`SELECT userID FROM library.user WHERE (username = ${username} OR email = ${username}) AND password = ${pass}`, (err, result) => {
            if (err) throw err;
            if(result.length == 0){
                let err = 'Brak';
                throw err;
            }

            req.session.userID = result[0].userID;
            res.redirect('/profile');
        })
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;