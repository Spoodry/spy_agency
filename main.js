const dotenv = require('dotenv');
const express = require('express');
const app = express();
const logger = require('morgan');
const routes = require('./routes/routes');

dotenv.config();

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.enable('trust proxy');
app.disable('x-powered-by');

app.set('port', port);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static('public'));

app.set('views', __dirname + '/views');

routes(app);

app.use((err, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.stack); 
});

module.exports = {
    app: app
};