const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString
});

function getUserInfo (userId, callback) {
    pool.query('SELECT * FROM "user" WHERE user_id = $1', [userId], function(err, res) {
        if (err) {
            throw err;
        } else {
            // We got a result from the db...
            console.log('Back from DB with: ' + res.rows);

            let result = {
                status: 'success',
                list: res.rows
            };

            callback(null, result);
        }

    })
}

function getPosts (callback) {
    pool.query('SELECT title, content, admin_id FROM post', function(err, res) {
        if (err) {
            throw err;
        } else {
            // We got a result from the db...
            console.log('Back from DB with: ' + JSON.stringify(res.rows));

            let result = {
                status: 'success',
                rows: res.rows
            };

            callback(null, result);
        }
    })
}

module.exports = {
    getUserInfo: getUserInfo,
    getPosts: getPosts
};