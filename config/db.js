const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234',
    database: process.env.DB_NAME || 'spy_agency',
    multipleStatements: false,
    charset: 'utf8mb4',
});

module.exports = {
    consult: consult
}

async function consult(query, params) {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result == undefined ? [] : result);
        });
    });
}