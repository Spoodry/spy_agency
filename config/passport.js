const jwt = require('jsonwebtoken');
const CookieStrategy = require('passport-cookie').Strategy;
const users = require('../models/users_model');

module.exports = async (passport) => {
    let opts = {};
    opts.jwtFromRequest = (req) => {
        return req.cookies.jwt_sa;
    };
    opts.secretOrPublicKey = process.env.SECRETORKEY;
    opts.passReqToCallback = true;
    opts.cookieName = 'jwt_sa';

    passport.use(new CookieStrategy(opts, async (req, token, done) => {
        jwt.verify(token, process.env.SECRETORKEY, async (err, decoded) => {
            if (err) {
                return done(err, false);
            }

            let user = await users.get_by_id(decoded.iu);

            if (!user) {
                return done(null, false);
            }
            
            return done(null, user);
        });
    }));
};