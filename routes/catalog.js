const express = require('express');
const router = express.Router();
const database = require('../database');


router.get('/', (req, res) => {
    database.con.query(`SELECT thumbnail, title, year, genre FROM library.film LIMIT 12;`, (err, result) => {
        let films = '';
        let opt = '';
        if(req.session.userID)
        {
            opt = '<div class="options"> <img src="/images/three-dots-vertical-svgrepo-com.svg" alt="threeDots"></div>';
        }

        result.forEach((film) => {
            films += '<div class="content">';
            films += "<img src='" + film.thumbnail +"'>";
            films += '<div class="info">'
            films += '<div class="desc">';
            films += '<div class="title">' + film.title + '</div>';
            films += '<div class="rest"><span>Rok wydania:' + film.year + '</span><span>Gatunki: '+ film.genre + '</span></div>';
            films += '</div>' + opt;
            films += '</div></div>';
        });
        sendResponse(films);
    });
    function sendResponse(main) {
        res.render('catalog', { pageTitle: 'Biblioteka', mainContent: main});
    }
});

module.exports = router;