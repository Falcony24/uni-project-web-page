const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require("express-session");
const flash = require('connect-flash');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.use(flash());

// const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const catalogRouter = require('./routes/catalog');
const profileRouter = require('./routes/profile');
const signinRouter = require('./routes/signin');
const contentRouter = require('./routes/content')
const e404Router = require('./routes/errors');

app.use((req, res, next) => {
    res.locals.userID = req.session.userID;
    next();
});
app.use((req, res, next) => {
    res.locals.userID = req.session.userID || null;
    next();
});

app.use('/', catalogRouter);
app.use('/catalog', catalogRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/signin', signinRouter);
app.use('/content', contentRouter)
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/catalog');
});
app.use('*', e404Router);

module.exports = app;
app.listen(3000);
