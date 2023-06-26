const dotenv = require('dotenv');
const express = require('express');
const app = express();
const logger = require('morgan');
const routes = require('./routes/routes');
const passport = require('passport');
const cookie_parser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie_parser(process.env.COOKIEKEY));

app.use(session({
    secret: process.env.SECRETORKEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.enable('trust proxy');
app.disable('x-powered-by');

app.set('port', port);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

routes(app);

app.use((err, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.stack); 
});

module.exports = {
    app: app
};