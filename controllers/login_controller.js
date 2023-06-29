const jwt = require('jsonwebtoken');
const users_model = require('../models/users_model');

const secret_or_key = process.env.SECRETORKEY;

module.exports = {
    async login(req, res, next) {
        try {
            let email = req.body.email;
            let password = req.body.password;

            if(!email || !password) {
                return res.render('login', { success: false, message: 'Email and password are required' });
            }

            let user = await users_model.login(email, password);

            console.log(user);

            if(!user) {
                return res.render('login', { success: false, message: 'Email or password are incorrect' });
            }

            let token = jwt.sign({
                iu : user.id,
                em : user.email
            }, secret_or_key, { expiresIn: (60 * 60 * 24) });

            res.cookie('jwt_sa', token);

            console.log('Redirecting to /hits');
            res.redirect('/hits');
        } catch(e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    }
}