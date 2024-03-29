var express = require('express');
var router = express.Router();
let joi = require('joi');
let sql = require('mysql');

router.get('/', (req, res, next) => {
    res.render('signup', {pageTitle: 'Rejestracja'})
})

router.post('/', async (req, res, next) => {
    let schema = joi.object({
        sUsername: joi.string()
            .alphanum()
            .min(6)
            .max(32)
            .required(),

        sEmail: joi.string()
            .email()
            .required(),

        sPassword: joi.string()
            .pattern(RegExp('^[a-zA-Z0-9!@#$%^&*)(+=._-]{6,32}$'))
    });

    var username = req.body.username;
    let email = req.body.email;
    let pass = req.body.password;

    // try {
    //     const validationResult = await schema.validateAsync({sUsername: username, sEmail: email, sPassword: pass}, {abortEarly: false});
    //
    //     var con = sql.createConnection({
    //         host: "localhost",
    //         user: "bibliotekarz",
    //         password: "root"
    //     });
    //
    //     con.connect(function(err) {
    //         if(err) throw err;
    //         con.query(`INSERT INTO bibliotek.user(username, email, password) VALUES("${username}", "${pass}", "${email}");`, function (err, result, fields) {
    //             if (err) throw err;
    //         })
    //     });
    //
    // } catch (err) {
    //     console.log(err);
    // }

})

module.exports = router;