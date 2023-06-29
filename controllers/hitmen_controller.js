const jwt = require('jsonwebtoken');
const users = require('../models/users_model');
const hitmen_model = require('../models/hitmen_model');

module.exports = {
    async index(req, res, next) {
        try {
            jwt.verify(req.cookies.jwt_sa, process.env.SECRETORKEY, async (err, decode) => {
                if(err) {
                    res.redirect('/');
                } else {
                    let user = await users.get_by_id(decode.iu);

                    let hitmen = [];
                    if(user.id_type == 1 && user.id == 1)
                        hitmen = await hitmen_model.get_all();
                    else if(user.id_type == 2)
                        hitmen = await hitmen_model.get_by_manager(user.id);
                    else if(user.id_type == 3)
                        return res.render('message', { success: false, code: 403, message: 'Forbidden', user: user });
                    res.render('hitmen', { success: true, user: user, hitmen: hitmen });
                }
            });
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    },
    async show(req, res, next) {
        try {
            jwt.verify(req.cookies.jwt_sa, process.env.SECRETORKEY, async (err, decode) => {
                if(err) {
                    res.redirect('/');
                } else {
                    let user = await users.get_by_id(decode.iu);

                    let hitman = [];
                    let hitmen = [];

                    if(user.id_type != 3) {
                        if(user.id_type == 1 && user.id == 1) {
                            hitmen = await hitmen_model.get_all_no_hitman(req.params.id);
                            hitman = await hitmen_model.get_by_id(req.params.id);
                        } else if(user.id_type == 2) {
                            hitmen = await hitmen_model.get_all_by_manager_no_hitman(req.params.id, user.id);
                            hitman = await hitmen_model.get_by_id_and_manager(req.params.id, user.id);
                        }
                    } else if(user.id_type == 3)
                        return res.render('message', { success: false, code: 403, message: 'You are not allowed to perform this action', user: user });

                    if(hitman.length > 0) {
                        hitman = hitman[0];
                        return res.render('hitmen_detail', { success: true, user: user, hitman: hitman, hitmen: hitmen });
                    } else {
                        return res.render('message', { success: false, code: 403, message: 'not found', user: user })
                    }
                }
            });
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    },
    async deactivate(req, res, next) {
        try {
            console.log('deactivate');
            await hitmen_model.deactivate(req.params.id);
            return res.redirect('/hitmen/' + req.params.id);
        } catch(e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    }
};