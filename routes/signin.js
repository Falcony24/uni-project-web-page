let express = require('express');
let router = express.Router();
let sql = require('mysql');

const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

app.post('/login', (req, res) => {
    let username = req.body.username;
    let pass = req.body.password;

    try {
        let con = sql.createConnection({
            host: "localhost",
            user: "bibliotekarz",
            password: "root"
        });

        con.connect(function(err) {
            if(err) throw err;
            con.query(`SELECT user_ID FROM bibliotek.user WHERE (username = ${username} OR email = ${username}) AND password = ${pass}`, function (err, result, fields){
                if (err) throw err;
                result
            })
        });

        if (validCredentials) {
            req.session.userId = 2;
            res.redirect('/profile');
        }
        else{
            console.log('aha');
        }
    }
    catch(err){
        console.log(err);
    }


});