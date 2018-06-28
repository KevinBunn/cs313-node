const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString
});

pool.query('SELECT * FROM person', [book], function(err, res) {
    if (err) {
        throw err;
    } else {
        // We got a result from the db...
        console.log('Back from DB with: ' + res.rows);

        var result = {
            status: 'success',
            list: res.rows
        };

        callback(null, result);
    }

})