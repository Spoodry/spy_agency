const jwt = require('jsonwebtoken');
const users = require('../models/users_model');
const hits_model = require('../models/hits_model');

module.exports = {
    async index(req, res, next) {
        try {
            jwt.verify(req.cookies.jwt_sa, process.env.SECRETORKEY, async (err, decode) => {
                if(err) {
                    res.redirect('/');
                } else {
                    let user = await users.get_by_id(decode.iu);
    
                    let hits = [];
                    if(user.id == 1 && user.id_type == 1) {
                        hits = await hits_model.get_all();
                    } else if(user.id_type == 2) {
                        hits = await hits_model.get_by_manager(user.id);
                    } else if(user.id_type == 3) {
                        hits = await hits_model.get_by_assignee(user.id);
                    }
    
                    res.render('hits', { success: true, user: user, hits: hits });
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

                    let hit = {};
                    let assignees = [];
                    if(user.id_type == 1) {
                        hit = await hits_model.get_by_id(req.params.id);
                        assignees = await users.get_all_hitmen();
                    } else if(user.id_type == 2) {
                        hit = await hits_model.get_by_id_and_manager(req.params.id, user.id);
                        assignees = await users.get_by_manager(user.id);
                    } else if(user.id_type == 3) {
                        hit = await hits_model.get_by_id_and_assignee(req.params.id, user.id);
                    }
                    
                    console.log(hit);
    
                    if(!hit) {
                        return res.render('message', { success: false, code: 404, message: 'Hit not found', user: user });
                    }
                    return res.render('hits_detail', { success: true, user: user, hit: hit, assignees: assignees });
                }
            });
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    },
    async status_update(req, res, next) {
        try {
            if(req.user.id_type == 3) {
                await hits_model.update_status(req.params.id, req.body.status, req.user.id, req.user.id);
                res.redirect('/hits/' + req.params.id);
            } else {
                res.render('message', { success: false, code: 403, message: 'You are not allowed to perform this action', user: req.user });
            }
        } catch(e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    },
    async assignee_update(req, res, next) {
        let id_assignee = req.body.id_assignee;
        let id_hit = req.params.id;

        try {
            if((req.user.id == 1 && req.user.id_type == 1) || req.user.id_type == 2) {
                await hits_model.update_assignee(id_hit, id_assignee);
                return res.status(200).send({success : true, code: 200, message: 'Hit updated successfully'});
            } else {
                return res.status(403).send({success : false, code: 403, message: 'You are not allowed to perform this action'});
            }
        } catch(e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    },
    async create(req, res, next) {
        try {
            jwt.verify(req.cookies.jwt_sa, process.env.SECRETORKEY, async (err, decode) => {
                if(err) {
                    res.redirect('/');
                } else {
                    let user = await users.get_by_id(decode.iu);

                    let assignees = [];
                    if(user.id_type == 1) {
                        assignees = await users.get_all_hitmen();
                    } else if(user.id_type == 2) {
                        assignees = await users.get_by_manager(user.id);
                    }
    
                    if(user.id_type == 3) {
                        return res.render('message', { success: false, code: 403, message: 'You are not allowed to perform this action', user: user });
                    }
                    return res.render('hits_create', { success: true, user: user, assignees: assignees });
                }
            });
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    },
    async new(req, res, next) {
        try {
            let id_assignee = req.body.id_assignee;
            let target_name = req.body.target_name;
            let description = req.body.description;
            let id_creator = req.user.id;

            if(!target_name || !id_assignee) {
                return res.render('hits_create', { success: false, user: req.user, message: 'You must provide a target name and an assignee'});
            }

            let result = await hits_model.create(id_assignee, description, target_name, id_creator);
            console.log(result);
            res.redirect('/hits');
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'An error has occurred.' });
        }
    },
};