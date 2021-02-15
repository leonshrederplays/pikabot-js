const GuildConfig = require("../classes/GuildConfig");

module.exports = {
    sqlInit: (connection) => {

            let sql = 
            "CREATE TABLE IF NOT EXISTS `guilds` (" +
            "`guildID` varchar(18) NOT NULL,"+
            "`guildName` varchar(100) NOT NULL,"+
            "`ownerID` varchar(18) NOT NULL,"+
            "`prefix` varchar(3) NOT NULL,"+
            "`cmdChannel` varchar(18) DEFAULT NULL,"+
            "`cmdMusicChannel` varchar(18) DEFAULT NULL,"+
            "`volume` bigint(3) DEFAULT 1 NOT NULL,"+
            "`queue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,"+
            "`greetingChannelID` varchar(18) DEFAULT NULL,"+
            "`autoRoleID` varchar(18) DEFAULT NULL,"+
            "`leaveChannelID` varchar(18) DEFAULT NULL,"+
            "`ruleRoleID` varchar(18) DEFAULT NULL,"+
            "`ruleChannelID` varchar(18) DEFAULT NULL,"+
            "`statCategoryID` varchar(18) DEFAULT NULL,"+
            "`statChannelID` varchar(18) DEFAULT NULL,"+
            "`twitchUserID` varchar(8) DEFAULT NULL,"+
            "`language` varchar(2) DEFAULT 'en' NOT NULL"+
            ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
        connection.query(sql, (err, result, fields) => {
            if(err) throw err;
            if(result.warningCount < 1) {
                console.log("Created Table Guilds...");
                connection.query("CREATE UNIQUE INDEX guildID ON guilds (guildID)", (err, result, fields) => {
                    if(err) throw err;
                })
            }
        });
    },
    setupData: async function(client, connection) {
        return new Promise(resolve => {
            let guildSize = client.guilds.cache.size;
            // If database is empty insert all Guilds.
            connection.query(
                'SELECT * FROM `guilds`',
                (err, rows, fields) => {
                    if(!err) {
                        if (rows.length === 0) {
                            if (guildSize > 0) {
                                console.log('Database is empty injecting all Guilds im currently part of...');
                                client.guilds.cache.forEach((guild) => {
                                    let guildID = guild.id;
                                    let guildName = guild.name;
                                    let ownerID = guild.ownerID;
                                    let info = {
                                        guildID: guildID,
                                        guildName: guildName,
                                        ownerID: ownerID,
                                        prefix: client.commandPrefix
                                    };
        
                                    connection.query(
                                        'INSERT INTO `guilds` SET ?',
                                        info,
                                        (err, results, fields) => {
                                            if (!err) {
                                                guild.guildSettings.guildID = guild.id;
                                                guild.guildSettings.guildName = guild.name;
                                                guild.guildSettings.ownerID = guild.ownerID;
                                                guild.guildSettings.prefix = client.commandPrefix;
                                                guild.guildSettings.cmdChannel = null;
                                                guild.guildSettings.cmdMusicChannel = null;
                                                guild.guildSettings.volume = 1;
                                                guild.guildSettings.queue = null;
                                                guild.guildSettings.greetingChannelID = null;
                                                guild.guildSettings.autoRoleID = null;
                                                guild.guildSettings.leaveChannelID = null;
                                                guild.guildSettings.ruleRoleID = null;
                                                guild.guildSettings.ruleChannelID = null;
                                                guild.guildSettings.statCategoryID = null;
                                                guild.guildSettings.statChannelID = null;
                                                guild.guildSettings.twitchUserID = null;
                                                guild.guildSettings.language = 'en';
                                            } else {
                                                console.log(err);
                                            }
                                        }
                                    );
                                });
                                console.log(
                                    'Finished injecting of: ' + guildSize + ' Guilds...'
                                );
                                const Guilds = client.guilds.cache.map(
                                    (guild) => guild.name
                                );
                                console.log('added: ', Guilds);
                            }
                        } else {
                            let removedGuildNames = [];
                            let removedGuilds = 0;
                            console.log("Checking for Guilds i am no longer part of...");
                            for(i = 0; i < rows.length; i++) {
                                // Save data to variables.
                                 let guildID = rows[i].guildID;
                                 let guildName = rows[i].guildName;
                                 let ownerID = rows[i].ownerID;
                                 let prefix  = rows[i].prefix;
                                 let cmdChannel = rows[i].cmdChannel;
                                 let cmdMusicChannel = rows[i].cmdMusicChannel;
                                 let volume = rows[i].volume;
                                 let queue = rows[i].queue;
                                 let greetingChannelID = rows[i].greetingChannelID;
                                 let autoRoleID = rows[i].autoRoleID;
                                 let leaveChannelID = rows[i].leaveChannelID;
                                 let ruleRoleID = rows[i].ruleRoleID;
                                 let ruleChannelID = rows[i].ruleChannelID;
                                 let statCategoryID = rows[i].statCategoryID;
                                 let statChannelID = rows[i].statChannelID;
                                 let twitchUserID = rows[i].twitchUserID;
                                 let language = rows[i].language;
        
                                 // Check if i am still part of this Guild.
                                 let isPartOfGuild = client.guilds.cache.has(guildID);
                                 if(!isPartOfGuild) {
                                     removedGuildNames.push(guildName);
                                     removedGuilds++;
                                     connection.query('DELETE FROM guilds WHERE guildID = ?', [guildID], (err, results, fields) => {
                                         if(err) throw err;
                                     }); 
                                 } else {
                                    // Pass guildSettings to variable.
                                    let guildData = client.guilds.cache.get(guildID);
                                    guildData.guildSettings.guildID = guildID;
                                    guildData.guildSettings.guildName = guildName;
                                    guildData.guildSettings.ownerID = ownerID;
                                    guildData.guildSettings.prefix = prefix;
                                    guildData.guildSettings.cmdChannel = cmdChannel;
                                    guildData.guildSettings.cmdMusicChannel = cmdMusicChannel;
                                    guildData.guildSettings.volume = volume;
                                    guildData.guildSettings.queue = queue;
                                    guildData.guildSettings.greetingChannelID = greetingChannelID;
                                    guildData.guildSettings.autoRoleID = autoRoleID;
                                    guildData.guildSettings.leaveChannelID = leaveChannelID;
                                    guildData.guildSettings.ruleRoleID = ruleRoleID;
                                    guildData.guildSettings.ruleChannelID = ruleChannelID;
                                    guildData.guildSettings.statCategoryID = statCategoryID;
                                    guildData.guildSettings.statChannelID = statChannelID;
                                    guildData.guildSettings.twitchUserID = twitchUserID;
                                    guildData.guildSettings.language = language;
                                 }
                            }
                            if(removedGuildNames.length === 0) {
                                console.log("Done...");
                                console.log("");
                            } else {
                                console.log("Finished deleting of: " + removedGuilds + " Guilds...");
                                console.log('removed: ', removedGuildNames);
                                console.log("");
                                removedGuilds = 0;
                                removedGuildNames = [];
                            }

                            let addedGuildNames = [];
                            let addedGuilds = 0;
                            console.log('Checking for new Guilds added while i was offline...');
                            client.guilds.cache.forEach((guild) => {
                                let guildID = guild.id;
                                let guildName = guild.name;
                                let ownerID = guild.ownerID;
                                let info = {
                                    guildID: guildID,
                                    guildName: guildName,
                                    ownerID: ownerID,
                                    prefix: client.commandPrefix
                                };
                    
                                if (guild.guildSettings.guildID === null) {
                                    addedGuildNames.push(guild.name);
                                    addedGuilds++;
                                    connection.query(
                                        'INSERT INTO `guilds` SET ?',
                                        info,
                                        (err, results, fields) => {
                                            if (!err) {
                                                guild.guildSettings.guildID = guild.id;
                                                guild.guildSettings.guildName = guild.name;
                                                guild.guildSettings.ownerID = guild.ownerID;
                                                guild.guildSettings.prefix = client.commandPrefix;
                                                guild.guildSettings.cmdChannel = null;
                                                guild.guildSettings.cmdMusicChannel = null;
                                                guild.guildSettings.volume = 1;
                                                guild.guildSettings.queue = null;
                                                guild.guildSettings.greetingChannelID = null;
                                                guild.guildSettings.autoRoleID = null;
                                                guild.guildSettings.leaveChannelID = null;
                                                guild.guildSettings.ruleRoleID = null;
                                                guild.guildSettings.ruleChannelID = null;
                                                guild.guildSettings.statCategoryID = null;
                                                guild.guildSettings.statChannelID = null;
                                                guild.guildSettings.twitchUserID = null;
                                                guild.guildSettings.language = 'en';
                                            } else {
                                                console.log(err);
                                            }
                                        }
                                    );
                                }
                            });
                            if (addedGuildNames.length === 0) {
                                console.log('Done...');
                                console.log('');
                            } else {
                                console.log(
                                    'Finished injecting of: ' + addedGuilds + ' Guilds...'
                                );
                                console.log('added: ', addedGuildNames);
                                console.log('');
                                addedGuilds = 0;
                                addedGuildNames = [];
                            }
                            resolve('SUCCESS');        
                        }
                    } else {
                        console.log(err.sqlMessage);
                        resolve('ERROR');
                    }
                }
            );
        });
    },
    validateData: (client, connection) => {
        console.log("Validating GuildSettings...");

        client.guilds.cache.forEach((guild) => {
            // Validating Guild-Name.
            if(guild.name != guild.guildSettings.guildName) {
                connection.query("UPDATE `guilds` SET `guildName` = ? WHERE `guildID` = ?", [guild.name, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Updated Guild-Name of: ${guild.name} from: ${guild.guildSettings.guildName} to: ${guild.name}`);
                        guild.guildSettings.guildName = guild.name;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }

            // Validating Owner-ID.
            if(guild.ownerID != guild.guildSettings.ownerID) {
                connection.query("UPDATE `guilds` SET `ownerID` = ? WHERE `guildID` = ?", [guild.ownerID, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Updated Guild-Owner from: ${guild.name} to: ${guild.ownerID}`);
                        guild.guildSettings.ownerID = guild.ownerID;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }

            // Validating Command-Channel.
            if(guild.guildSettings.cmdChannel != null && !guild.channels.cache.has(guild.guildSettings.cmdChannel)) {
                connection.query("UPDATE `guilds` SET `cmdChannel` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Command-Channel from ${guild.name}`);
                        guild.guildSettings.cmdChannel = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating MusicCommand-Channel.
            if(guild.guildSettings.cmdMusicChannel != null && !guild.channels.cache.has(guild.guildSettings.cmdMusicChannel)) {
                connection.query("UPDATE `guilds` SET `cmdMusicChannel` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted MusicCommand-Channel from ${guild.name}`);
                        guild.guildSettings.cmdMusicChannel = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating Greeting-Channel.
            if(guild.guildSettings.greetingChannelID != null && !guild.channels.cache.has(guild.guildSettings.greetingChannelID)) {
                connection.query("UPDATE `guilds` SET `greetingChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Greeting-Channel from ${guild.name}`);
                        guild.guildSettings.cmdChannel = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating Leave-Channel.
            if(guild.guildSettings.leaveChannelID != null && !guild.channels.cache.has(guild.guildSettings.leaveChannelID)) {
                connection.query("UPDATE `guilds` SET `leaveChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Leave-Channel from ${guild.name}`);
                        guild.guildSettings.leaveChannelID = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating Autorole.
            if(guild.guildSettings.autoRoleID != null && !guild.roles.cache.has(guild.guildSettings.autoRoleID)) {
                connection.query("UPDATE `guilds` SET `autoRoleID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Autorole from ${guild.name}`);
                        guild.guildSettings.autoRoleID = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating Rule-Role.
            if(guild.guildSettings.ruleRoleID != null && !guild.roles.cache.has(guild.guildSettings.ruleRoleID)) {
                connection.query("UPDATE `guilds` SET `ruleRoleID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Rule-Role from ${guild.name}`);
                        guild.guildSettings.ruleRoleID = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating Rule-Channel.
            if(guild.guildSettings.ruleChannelID != null && !guild.channels.cache.has(guild.guildSettings.ruleChannelID)) {
                connection.query("UPDATE `guilds` SET `ruleChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Rule-Channel from ${guild.name}`);
                        guild.guildSettings.ruleChannelID = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating Stat-Category.
            if(guild.guildSettings.statCategoryID != null && !guild.channels.cache.has(guild.guildSettings.statCategoryID)) {
                connection.query("UPDATE `guilds` SET `statCategoryID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Stat-Category from ${guild.name}`);
                        guild.guildSettings.statCategoryID = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
            // Validating Stat-Channel.
            if(guild.guildSettings.statChannelID != null && !guild.channels.cache.has(guild.guildSettings.statChannelID)) {
                connection.query("UPDATE `guilds` SET `statChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
                    if(!err) {
                        console.log(`Reseted Stat-Channel from ${guild.name}`);
                        guild.guildSettings.statChannelID = null;
                    } else {
                        console.log(err.sqlMessage);
                    }
                })
            }
        });
    }
};