const MySQL = require('mysql');
require('dotenv').config({ path: 'E:PikaBot.env' });

module.exports = {
    dcConnect: new Promise((result, reject) => {
        try {
            var connection = MySQL.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASS,
                database: process.env.DCDB
            });

            connection.connect(function (err) {
                if (err) {
                    console.error(
                        'Error connecting to Discord-Database: ' +
                            err.message +
                            ' retrying in 3secs...'
                    );
                    return reject('FAILED');
                }
                console.log(
                    'Connected to Discord-Database as: ' + connection.threadId
                );
                return result(connection);
            });
        } catch (e) {
            console.log(e);
            reject('ERROR');
        }
    }),

    twConnect: new Promise((result, reject) => {
        try {
            var connection = MySQL.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASS,
                database: process.env.TWDB
            });

            connection.connect(function (err) {
                if (err) {
                    console.error(
                        'Error connecting to Twitch-Database: ' +
                            err.message +
                            ' retrying in 3secs...'
                    );
                    reject('ERROR');
                    return;
                }
                console.log(
                    'Connected to Twitch-Database as: ' + connection.threadId
                );
                result(connection);
            });
        } catch (e) {
            console.log(e);
            reject('ERROR');
        }
    })
};
