const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString
});

function getUserInfo (userId) {
    console.log(`User id = ${userId}`);
    pool.query('SELECT * FROM "user" WHERE id = $1', [userId], function(err, res) {
        if (err) {
            throw err;
        } else {
            // We got a result from the db...
            console.log('Back from DB with: ' + JSON.stringify(res.rows));

            let result = {
                status: 'success',
                rows: res.rows
            };

            let resultJson = JSON.parse(JSON.stringify(result));
            console.log(resultJson["rows"][0]["username"]);
            return resultJson["rows"][0]["username"];
        }

    })
}

function getAllPosts (callback) {
    pool.query('SELECT id, title, content, admin_id FROM post', function(err, res) {
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

function getSinglePost (id, callback) {
    pool.query('SELECT id, title, content, admin_id FROM post WHERE id = $1', [id], function(err, res) {
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

function addUser(username, password, email, callback) {
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            throw err;
        }
        else {
            pool.query('INSERT INTO "user" (username, password, email, is_admin) ' +
                        'VALUES ($1, $2, $3, FALSE) RETURNING id', [username, hash, email], function (err, res) {
                if (err) {
                    throw err;
                } else {
                    // We got a result from the db...
                    console.log('Inserted into "user" at id: ' + res.rows[0].id);

                    callback(null);
                }
            })
        }
    });
}

function addPost(title, content, admin_id) {
    pool.query('INSERT INTO post (title, content, admin_id, date_created) ' +
        'VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id', [title, content, admin_id], function (err, res) {
        if (err) {
            throw err;
        } else {
            // We got a result from the db...
            console.log('Inserted into post at id: ' + res.rows[0].id);
            let result = {
                status: 'success',
                id: res.rows[0].id
            };

            callback(null, result);
        }
    });
}

module.exports = {
    getUserInfo: getUserInfo,
    getAllPosts: getAllPosts,
    getSinglePost: getSinglePost,
    addUser: addUser,
    addPost: addPost
};