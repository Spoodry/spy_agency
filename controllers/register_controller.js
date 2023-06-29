const users_model = require('../models/users_model');

module.exports = {
    index(req, res, next) {
        try {
            return res.render('register', { success: true, message: '' });
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.status(403).send({ error: 'Se ha encontrado un error.' });
        }
    },
    async create(req, res, next) {
        try {
            const { email, password, repeat_password } = req.body;
            let errors = [];
            
            if(!email || !password || !repeat_password) {
                return res.render('register', { success : false, message : 'missing fields' });
            }

            //check if is email with regex
            if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                return res.render('register', { success : false, message : 'invalid email' });
            }
            
            if(password != repeat_password) {
                return res.render('register', { success : false, message : 'passwords do not match' });
            }
            
            if(password.length < 4) {
                return res.render('register', { success : false, message : 'password is not longer than the expected length of 4' });
            }
            
            await users_model.create_hitman(email, password, 0);
            return res.render('register', { success : true, message : 'user create' });
        } catch (e) {
            console.log("[ERROR]: " + e);
            return res.render('register', { success : false, message : 'duplicate email' });
        }
    }
};