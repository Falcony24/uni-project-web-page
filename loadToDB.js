const fs = require("fs");
const sql = require('mysql');
fs.readFile('movies-2020s.json', 'utf-8', (err, val) => {
    const movies = JSON.parse(val);

    var con = sql.createConnection({
        host: "localhost",
        user: "admin",
        password: "admin"
    });
    con.connect();

    movies.forEach(movie => {
            let title = sql.escape(movie.title);
            let year = movie.year;
            let cast = sql.escape(movie.cast.join(', '));
            let genre = sql.escape(movie.genres.join(', '));
            let thumbnail = sql.escape(movie.thumbnail);
            let description = sql.escape(movie.extract);

        con.query(`INSERT INTO library.film(title, year, cast, genre, thumbnail, description)
                        VALUES(${title}, ${year}, ${cast}, ${genre}, ${thumbnail}, ${description});`)
    });
});

