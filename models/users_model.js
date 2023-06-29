let db = require('../config/db');
let users = {};

users.login = async (email, password) => {
    let user = await db.consult('SELECT * FROM users WHERE email = ? AND password = MD5(?) AND active = 1', [email, password]);
    return user.length > 0 ? user[0] : null;
};

users.get_by_id = async (id) => {
    let user = await db.consult('SELECT id, id_type, type, email, name, id_manager, manager, active, created_at, updated_at FROM vw_users WHERE id = ? AND active = 1', [id]);
    return user.length > 0 ? user[0] : null;
};

users.get_by_type = async (id_type) => {
    let users = await db.consult('SELECT * FROM users WHERE id_type = ?', [id_type]);
    return users;
};

users.get_all_hitmen = async () => {
    let users = await db.consult('SELECT * FROM vw_users WHERE id_type = 3 AND active = 1;');
    return users;
};

users.get_without_boss = async () => {
    let users = await db.consult('SELECT * FROM vw_users WHERE (id_type != 1 AND id != 1) AND active = 1;');
    return users;
};

users.get_by_manager = async (id_manager) => {
    let users = await db.consult('SELECT * FROM vw_users WHERE id_type = 3 AND id_manager = ? AND active = 1', [id_manager]);
    return users;
};

users.create_hitman = async (email, password, id_manager) => {
    let user = await db.consult('INSERT INTO users (id_type, email, password, name, description, id_manager, active, created_at, updated_at) VALUES (3, ?, MD5(?), \'\', \'\', ?, 1, NOW(), NOW())', [email, password, id_manager]);
    return user;
};

module.exports = users;