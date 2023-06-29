const db = require('../config/db');
const hits = {};

hits.get_by_assignee = async (id_assignee) => {
    let hits = await db.consult('SELECT * FROM vw_hits WHERE id_assignee = ?;', [id_assignee]);
    return hits;
}

hits.get_all = async () => {
    let hits = await db.consult('SELECT * FROM vw_hits;');
    return hits;
}

hits.get_by_manager = async (id_manager) => {
    let hits = await db.consult('SELECT * FROM vw_hits WHERE id_assignee = ? OR id_manager = ?;', [id_manager, id_manager]);
    return hits;
}

hits.get_by_id = async (id) => {
    let hit = await db.consult('SELECT * FROM vw_hits WHERE id = ?;', [id]);
    return hit.length > 0 ? hit[0] : null;
}

hits.get_by_id_and_assignee = async (id, id_assignee) => {
    let hit = await db.consult('SELECT * FROM vw_hits WHERE id = ? AND id_assignee = ?;', [id, id_assignee]);
    return hit.length > 0 ? hit[0] : null;
}

hits.get_by_id_and_manager = async (id, id_manager) => {
    let hit = await db.consult('SELECT * FROM vw_hits WHERE id = ? AND id_manager = ?;', [id, id_manager]);
    return hit.length > 0 ? hit[0] : null;
}

hits.update_status = async (id, status, id_user) => {
    let hit = await db.consult('UPDATE hits SET id_status = ?, updated_at = NOW() WHERE id = ? AND (id_assignee = ?) AND id_status = 1;', [status, id, id_user]);
    return hit;
}

hits.update_status_boss = async (id, status) => {
    let hit = await db.consult('UPDATE hits SET status = ?, updated_at = NOW() WHERE id = ? AND id_status = 1;', [status, id]);
    return hit;
}

hits.update_assignee = async (id, id_assignee) => {
    let hit = await db.consult('UPDATE hits SET id_assignee = ?, updated_at = NOW() WHERE id = ? AND id_status = 1;', [id_assignee, id]);
    return hit;
}

hits.create = async (id_assignee, description, target_name, id_creator) => {
    let hit = await db.consult('INSERT INTO hits (id_assignee, description, target_name, id_status, id_creator, created_at, updated_at) VALUES (?, ?, ?, 1, ?, NOW(), NOW());', [id_assignee, description, target_name, id_creator]);
    return hit;
}

module.exports = hits;