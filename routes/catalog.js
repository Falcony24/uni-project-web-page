const express = require('express');
const router = express.Router();
const fs = require('fs');
const {randomInit} = require("mysql/lib/protocol/Auth");

router.get('/', (req, res) => {
    let numMovies = Math.floor(Math.random() * 10) + 12;

    fs.readFile('database/movies-2020s.json', 'utf8', (err, data) => {
        let movies;
        let movies_res = '<div id="mainCatalog">'
        movies = JSON.parse(data);
        let opt = ''

        movies.slice(0, numMovies).forEach(movie => {
            movies_res += '<div class="content">';
            movies_res += "<img src='" + movie.thumbnail + "' alt='" + movie.title + "'>"
            movies_res += '<div class="info">';
            movies_res += '<div class="descCatalog">';
            movies_res += '<div class="title">' + movie.title + '</div>';
            movies_res += '<div class="rest"><span>Rok wydania: ' + movie.year + '</span><span>Gatunki: ' + movie.genres.join(', ') + '</span></div>';
            movies_res += '</div>';
            movies_res += '</div></div>';
        });
        movies_res += '</div>'
        sendResponse(movies_res)
    });
    function sendResponse(main) {
        res.render('catalog', { pageTitle: 'Biblioteka', mainContent: main});
    }
})

module.exports = router