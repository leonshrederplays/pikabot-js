const { setupData, validateData }  = require('../sql/sqlInit.js'); // Initialize Database.
const { blockCommand } = require('../handlers/commandoHandlers');

module.exports = {
	onReady: (client, connection) => {
		client.on('ready', () => {
			client.user.setStatus('online');
			client.user.setActivity('Hallo');
			const Guilds = client.guilds.cache.map(guild => guild.name);
			
			console.log("");
			console.log('Discord-Servers i am connected to: ', Guilds);
			console.log("Connected to a total of: " + client.guilds.cache.size + " Discord-Server's.");
			console.log("");
			//getData(client, Guild, connection, guildConfig);

			let data;
			async function dataGetter() {
				data = await setupData(client, connection);
			}
			dataGetter();
			setTimeout(verifyData, 3000);
			function verifyData() {
				if(data === 'ERROR') {
					guildConfig = new Map();
					dataGetter();
					return setTimeout(verifyData, 3000);
				}
				console.log("");
				console.log(`${client.user.tag} is Ready!`);
				console.log("");
				validateData(client, connection);
				setTimeout(() => {
					blockCommand(client);
				}, 5000);
			}
		});
	},
	onVoiceStateUpdate: (client) => {
		client.on("voiceStateUpdate", async (___, newState) => {
			if (
			  newState.member.user.bot &&
			  !newState.channelID &&
			  newState.guild.musicData.songDispatcher &&
			  newState.member.user.id == client.user.id
			) {
			  newState.guild.musicData.queue.length = 0;
			  newState.guild.musicData.songDispatcher.end();
			  return;
			}
			if (
			  newState.member.user.bot &&
			  newState.channelID &&
			  newState.member.user.id == client.user.id &&
			  !newState.selfDeaf
			) {
			  newState.setSelfDeaf(true);
			}
		  });
	},
	onPresenceUpdate: (client) => {
		client.on('presenceUpdate', (oldPresence, newPresence) => {

		})
	},
	onRateLimit: (client) => {
		client.on('rateLimit', (rateLimitInfo) => {

		})
	},
	onTypingStart: (client) => {
		client.on('typingStart', (channel, user) => {

		})
	},
	onInvalidated: (client) => {
		client.on('invalidated', () => {

		})
	},
	onUserUpdate: (client) => {
		client.on('userUpdate', (oldUser, newUser) => {

		})
	},
	onWebhookUpdate: (client) => {
		client.on('webhookUpdate', (channel) => {

		})
	}
}