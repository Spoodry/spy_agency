const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = (app) => {
    app.get('/', (req, res) => {
        try {
            jwt.verify(req.cookies.jwt_sa, process.env.SECRETORKEY, async (err, decode) => {
                console.log('decode: ' + decode);
                if(err) {
                    res.render('login', { success: true, message: '' });
                } else {
                    res.redirect('/hits');
                }
            });
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'Se ha encontrado un error.' });
        }
    });
    
    app.use('/login', require('./login_routes'));

    app.get('/logout', (req, res) => {
        res.clearCookie('jwt_sa');
        res.redirect('/');
    });

    app.use('/register', require('./register_routes'));

    app.use('/hits', require('./hits_routes'));
    app.use('/hitmen', require('./hitmen_routes'));
};