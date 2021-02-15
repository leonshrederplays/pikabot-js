const MySQL = require('mysql');
require('dotenv').config({ path: 'E:\PikaBot\.env' });

module.exports = {
    dcConnect: async function() {
        return new Promise(resolve => {
            try {
                var connection = MySQL.createConnection({
                    host     : process.env.HOST,
                    user     : process.env.USER,
                    password : process.env.PASS,
                    database : process.env.DCDB
                });
                
                connection.connect(function(err) {
                    if (err) {
                      console.error('Error connecting to Discord-Database: ' + err.message + " retrying...");
                      resolve('ERROR');
                      return;
                    }
                    console.log('Connected to Discord-Database as: ' + connection.threadId);
                    resolve(connection);
                });
            } catch(e) {
                console.log(e);
                resolve('ERROR');
            }
        })
    },
    twConnect: async function twConnect() {
        return new Promise(resolve => {
            try {
                var connection = MySQL.createConnection({
                    host     : process.env.HOST,
                    user     : process.env.USER,
                    password : process.env.PASS,
                    database : process.env.TWDB
                });
                
                connection.connect(function(err) {
                    if (err) {
                      console.error('Error connecting to Twitch-Database: ' + err.message + " retrying...");
                      resolve('ERROR');
                      return;
                    }
                    console.log('Connected to Twitch-Database as: ' + connection.threadId);
                    resolve(connection);
                });
            } catch(e) {
                console.log(e);
                resolve('ERROR');
            }
        });
    }
}
