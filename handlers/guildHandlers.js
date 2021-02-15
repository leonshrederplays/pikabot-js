module.exports = {
    onGuildCreate: (client, Guild, connection) => {
        client.on('guildCreate', joined => {
            let guildID = joined.id;
            let guildName = joined.name;
            let ownerID = joined.ownerID;
            let info = {
                guildID: guildID,
                guildName: guildName,
                ownerID: ownerID,
                prefix: "!",
                cmdChannel: null,
                cmdMusicChannel: null,
                volume: 50, 
                queue: null,
                greetingChannelID: null,
                autoRoleID: null,
                leaveChannelID: null,
                ruleRoleID: null,
                ruleChannelID: null,
                statCategoryID: null,
                statChannelID: null,
                twitchUserID: null,
                language: "en"
            };
            connection.query('INSERT INTO `guilds` SET ?', info, (err, results, fields) => {
                if(!err) {
                    guildConfig.set(guildID, new Guild(guildID, guildName, ownerID, "!", null, null, 50, null, false, null, null, null, null, null, null, null, null, "en"))
                    let arr = [];
                    arr.push(guildName);
                    console.log(arr, " added to the Database.");
                } else {
                    console.log(err);
                }
            });
        })
    },
    onGuildDelete: (client, connection) => {
        client.on('guildDelete', deleted => {
            let guildID = deleted.id;
            connection.query('DELETE FROM guilds WHERE guildID = ?', [guildID], (err, results, fields) => {
                if(err) throw err;
                let arr = [];
                arr.push(guildConfig.get(guildID).guildName);
                console.log(arr, " deleted from the Database.");
                guildConfig.delete(guildID);
            })     
        })
    },
    onGuildMemberAdd: (client, MessageEmbed) => {
        client.on('guildMemberAdd', newMember => {
            let guildConf = guildConfig.get(newMember.guild.id);
            let roleID = guildConf.autoRoleID;
            if(roleID != null) {
                try {
                    let checkRole = newMember.guild.roles.cache.find(role => role.id === roleID);
                    newMember.roles.add(checkRole);
                } catch(e) {
                    console.log(e);
                }
            }

            let channelID = guildConf.greetingChannelID;
            if(channelID != null) {
                let checkChannel = newMember.guild.channels.cache.find(channel => channel.id === channelID);
                try {
                    try {
                        let embed = new MessageEmbed();
                        embed.setTitle("Herzlich Willkommen "+newMember.displayName)
                        embed.setAuthor(client.user.username, client.user.avatarURL())
                        embed.setColor("#0099FF")
                        embed.setThumbnail(newMember.avatarURL())
                        embed.setFooter("Der Bot wird stetig weiterentwickelt auch wenn dem nicht so ist.", client.user.avatarURL())
                        embed.setTimestamp()
                        embed.addField("**Username:**", newMember.displayName, true)
                        embed.addField("**User-Discriminator:**", newMember.user.discriminator, true)
                        embed.addField("**User-ID:**", newMember.id, true)
                        switch(newMember.presence.status) {
                            case "online":
                                embed.addField("**Status:**", "Online", true)
                                break;
        
                            case "offline":
                                embed.addField("**Status:**", "Offline", true)
                                break;
                            case "dnd":
                                embed.addField("**Status:**", "Do not Disturb", true)
                                break;
                            case "idle":
                                embed.addField("**Status:**", "AFK", true)
                                break;
                        }
                        if(!newMember.presence.game == undefined || !newMember.presence.clientStatus) {
                            let game = newMember.presence.activities.map(entries => entries);
                            if(game.length != 0) {
                                embed.addField(`**Spiel:** `, game, true)
                            }
                        }
        
                        let createdAt = newMember.createdAt;
                        let dayString = createdAt.substring(0,3)
                        .replace("Mon", "Montag")
                        .replace("Tue", "Dienstag")
                        .replace("Wed", "Mittwoch")
                        .replace("Thur", "Donnerstag")
                        .replace("Sat", "Samstag")
                        .replace("Sun", "Sonntag")
                        console.log(dayString)
                        
                        let monthString = createdAt.substring(4,7)
                        .replace("Jan", "01")
                        .replace("Feb", "02")
                        .replace("Mar", "03")
                        .replace("Apr", "04")
                        .replace("May", "05")
                        .replace("June", "06")
                        .replace("July", "07")
                        .replace("Aug", "08")
                        .replace("Sep", "09")
                        .replace("Oct", "10")
                        .replace("Nov", "11")
                        .replace("Dec", "12");
                        console.log(monthString)
                
                        let dayNumber = createdAt.substring(8,10)
                        console.log(dayNumber)
                
                        let yearNumber = createdAt.substring(11,15)
                        console.log(yearNumber);
                
                        let hrs = createdAt.substring(16,18)
                        console.log(hrs);
                
                        let min = createdAt.substring(19, 21);
                        console.log(min);
                
                        let sec = createdAt.substring(22, 24);
                        console.log(sec);
        
                        let string = `${dayNumber}.${monthString}.${yearNumber} um ${hrs}:${min}:${sec}`;
        
                        embed.addField(`**Erstellt am:** `, string, true)
                
                        checkChannel.send(embed);
                    
                    } catch (e) {
                        console.log(e);
                    }
                } catch(e) {
                    console.log(e);
                }
            }
        })
    },
	onGuildMemberRemove: (client, MessageEmbed) => {
        client.on('guildMemberRemove', member => {
            if(member.id === '750430846468620380') return;
            try {
                let embed = new MessageEmbed();
                embed.setTitle("Auf ein baldiges wiedersehen "+member.displayName)
                embed.setAuthor(client.user.username, client.user.avatarURL())
                embed.setColor("#0099FF")
                embed.setThumbnail(member.avatarURL())
                embed.setFooter("Der Bot wird stetig weiterentwickelt auch wenn dem nicht so ist.", client.user.avatarURL())
                embed.setTimestamp()
                embed.addField("**Username:**", member.displayName, true)
                embed.addField("**User-Discriminator:**", member.user.discriminator, true)
                embed.addField("**User-ID:**", member.id, true)
                switch(member.presence.status) {
                    case "online":
                        embed.addField("**Status:**", "Online", true)
                        break;

                    case "offline":
                        embed.addField("**Status:**", "Offline", true)
                        break;
                    case "dnd":
                        embed.addField("**Status:**", "Do not Disturb", true)
                        break;
                    case "idle":
                        embed.addField("**Status:**", "AFK", true)
                        break;
                }
                if(!member.presence.game == undefined || !member.presence.clientStatus) {
                    let game = member.presence.activities.map(entries => entries);
                    if(game.length != 0) {
                        embed.addField(`**Spiel:** `, game, true)
                    }
                }

                let createdAt = member.createdAt;
                let dayString = createdAt.substring(0,3)
                .replace("Mon", "Montag")
                .replace("Tue", "Dienstag")
                .replace("Wed", "Mittwoch")
                .replace("Thur", "Donnerstag")
                .replace("Sat", "Samstag")
                .replace("Sun", "Sonntag")
                console.log(dayString)
                
                let monthString = createdAt.substring(4,7)
                .replace("Jan", "01")
                .replace("Feb", "02")
                .replace("Mar", "03")
                .replace("Apr", "04")
                .replace("May", "05")
                .replace("June", "06")
                .replace("July", "07")
                .replace("Aug", "08")
                .replace("Sep", "09")
                .replace("Oct", "10")
                .replace("Nov", "11")
                .replace("Dec", "12");
                console.log(monthString)
        
                let dayNumber = createdAt.substring(8,10)
                console.log(dayNumber)
        
                let yearNumber = createdAt.substring(11,15)
                console.log(yearNumber);
        
                let hrs = createdAt.substring(16,18)
                console.log(hrs);
        
                let min = createdAt.substring(19, 21);
                console.log(min);
        
                let sec = createdAt.substring(22, 24);
                console.log(sec);

                let string = `${dayNumber}.${monthString}.${yearNumber} um ${hrs}:${min}:${sec}`;
                embed.addField(`**Erstellt am:** `, string, true)
        
                let channel = member.guild.channels.cache.find(channel => channel.id == "752131300705697823" || channel.name == "bye_bye");
                channel.send(embed);
            
            } catch (e) {
                console.log(e);
            }
        })
    },
    onGuildBanAdd: (client) => {
        client.on('guildBanAdd', (guild, user) => {
  
        })
    },
    onGuildBanRemove: (client) => {
        client.on('guildBanRemove', (guild, user) => {
          
        })
    },
    onGuildMemberUpdate: (client) => {
        client.on('guildMemberUpdate', (oldMember, newMember) => {
          
        })
    },
    onGuildUnavailable: (client) => { 
        client.on('guildUnavailable', (guild) => {
          
        })
    },
    onGuildUpdate: (client) => {
        client.on('guildUpdate', (oldGuild, newGuild) => {
          
        })
    },
    onGuildIntegrationsUpdate: (client) => {
        client.on('guildIntegrationsUpdate', (guild) => {
          
        })
    },
    onGuildMemberAvailable: (client) => {
        client.on('guildMemberAvailable', (member) => {
          
        })
    },
    onGuildMembersChunk: (client) => {
        client.on('guildMembersChunk', (members, guild, chunk) => {
          
        })
    },
    onGuildMemberSpeaking: (client) => {
        client.on('guildMemberSpeaking', (member, speaking) => {
          
        })
    },
};