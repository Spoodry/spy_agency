let db = require('../config/db');
let users = {};

users.login = async (email, password) => {
    let user = await db.consult('SELECT * FROM users WHERE email = ? AND password = MD5(?) AND active = 1', [email, password]);
    return user.length > 0 ? user[0] : null;
};

users.get_by_id = async (id) => {
    let user = await db.consult('SELECT * FROM users WHERE id = ? AND active = 1', [id]);
    return user.length > 0 ? user[0] : null;
};

users.get_by_type = async (id_type) => {
    let users = await db.consult('SELECT * FROM users WHERE id_type = ?', [id_type]);
    return users;
};

module.exports = users;