const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));

let indexRouter = require('./routes');
let signupRouter = require('./routes/signup');
let catalogRouter = require('./routes/catalog');

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
app.use('/signup', signupRouter);

// error 404
app.get('*', (req, res) => {
    res.status(404).send('what???');
});


module.exports = app;
app.listen(3000);
