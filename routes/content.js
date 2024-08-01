const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
    const title = req.query.title;
    if (!title) res.redirect('/*');

    try {
        let opt = ''
        if(req.session.userID)
        {
            opt += '<div id="options"><button id="save">Zapisz</button></div>';
        }

        let main = await readMovie(title, opt);

        res.render('content', { pageTitle: title, mainContent: main });
    } catch (err) {
        res.redirect('/*');
    }
})

async function readMovie(title, opt) {
    try {
        const data = await fs.readFile('database/movies-2020s.json', 'utf8');
        const movies = JSON.parse(data);
        let main = '<div id="mainMovie">';

        movies.forEach(movie => {
            if (movie.title === title) {
                main += "<div id='details'><img alt='" + movie.title + "' src='" + movie.thumbnail + "'>" +'<div id="table">'
                main += '<table><thead><tr><th>Rok produkcji</th> <th>' + movie.year + '</th></tr></thead><tbody><tr>'
                main += '<td>Główne role</td><td>' + movie.cast.join(', ') + '</td></tr><tr><td>Gatunek</td><td>'
                main += movie.genres.join(', ') + '</td></tr></tbody></table></div>'
                main +=  opt
                main += '</div><div id="descMovie"><span>' + movie.title + '</span><span>' + movie.extract + '</span></div>'
                return;
            }
        });
        main += '</div>'
        return main;
    } catch (err) {
        console.error(err)
        res.redirect('/*')
    }
}

module.exports = router