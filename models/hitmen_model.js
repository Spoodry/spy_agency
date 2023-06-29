const db = require('../config/db');
const hitmen = {};

hitmen.get_all = async () => {
    let hitmen = await db.consult('SELECT * FROM vw_users WHERE id_type = 3;');
    return hitmen;
}

hitmen.get_by_manager = async (id_manager) => {
    let hitmen = await db.consult('SELECT * FROM vw_users WHERE id_type = 3 AND id_manager = ?;', [id_manager]);
    return hitmen;
}

hitmen.get_by_id = async (id) => {
    let hitmen = await db.consult('SELECT * FROM vw_users WHERE id_type = 3 AND id = ?;', [id]);
    return hitmen;
}

hitmen.get_by_id_and_manager = async (id, id_manager) => {
    let hitmen = await db.consult('SELECT * FROM vw_users WHERE id_type = 3 AND id = ? AND id_manager = ?;', [id, id_manager]);
    return hitmen;
}

hitmen.deactivate = async (id) => {
    let hitmen = await db.consult('UPDATE users SET active = 0, updated_at = NOW() WHERE id = ? AND active = 1;', [id]);
    return hitmen;
}

hitmen.get_all_by_manager_no_hitman = async (id, id_manager) => {
    let hitmen = await db.consult('SELECT * FROM vw_users WHERE id_type = 3 AND id <> ? AND id_manager = ?;', [id, id_manager]);
    return hitmen;
}

hitmen.get_all_no_hitman = async (id) => {
    let hitmen = await db.consult('SELECT * FROM vw_users WHERE id_type = 3 AND id <> ?;', [id]);
    return hitmen;
}

module.exports = hitmen;