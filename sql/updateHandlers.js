module.exports = {
	updateCommandChannel: (client, connection, channel, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `cmdChannel` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Command-Channel from ${guild.name}`);
					guild.guildSettings.cmdChannel = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {

		}
	},
	updateMusicCommandChannel: (client, connection, channel, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `cmdMusicChannel` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted MusicCommand-Channel from ${guild.name}`);
					guild.guildSettings.cmdMusicChannel = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {

		}
	},
	updateGreetingChannel: (client, connection, channel, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `greetingChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Greeting-Channel from ${guild.name}`);
					guild.guildSettings.cmdChannel = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {
			
		}
	},
	updateLeaveChannel: (client, connection, channel, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `leaveChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Leave-Channel from ${guild.name}`);
					guild.guildSettings.leaveChannelID = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {
			
		}
	},
	updateAutoRole: (client, connection, role, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `autoRoleID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Autorole from ${guild.name}`);
					guild.guildSettings.autoRoleID = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {
			
		}
	},
	updateRuleRole: (client, connection, role, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `ruleRoleID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Rule-Role from ${guild.name}`);
					guild.guildSettings.ruleRoleID = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {
			
		}
	},
	updateRuleRoleChannel: (client, connection, channel, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `ruleChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Rule-Channel from ${guild.name}`);
					guild.guildSettings.ruleChannelID = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {
			
		}
	},
	updateStatCategory: (client, connection, channel, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `statCategoryID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Stat-Category from ${guild.name}`);
					guild.guildSettings.statCategoryID = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {
			
		}
	},
	updateStatChannel: (client, connection, channel, deactivate) => {
		if(deactivate) {
			connection.query("UPDATE `guilds` SET `statChannelID` = ? WHERE `guildID` = ?", [null, guild.id], (err, result) => {
				if(!err) {
					console.log(`Reseted Stat-Channel from ${guild.name}`);
					guild.guildSettings.statChannelID = null;
				} else {
					console.log(err.sqlMessage);
				}
			})
		} else {
			
		}
	}
}