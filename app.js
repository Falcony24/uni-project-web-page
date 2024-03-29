const express = require('express');
const sessionExpress = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));

let indexRouter = require('./routes/index');
let signupRouter = require('./routes/signup');
let catalogRouter = require('./routes/catalog');
let profileRouter = require('./routes/profile');
let signinRouter = require('./routes/signin');
let e404Router = require('./routes/errors');

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/signin', signinRouter);
app.use('*', e404Router);



module.exports = app;
app.listen(3000);
