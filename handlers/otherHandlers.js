const { setupData, validateData } = require('../sql/sqlInit.js'); // Initialize Database.
const { blockCommand } = require('../handlers/commandoHandlers');

module.exports = {
    onReady: (client, connection) => {
        client.on('ready', () => {
            client.user.setStatus('online');
            client.user.setActivity('Hallo');
            const Guilds = client.guilds.cache.map((guild) => guild.name);

            console.log('');
            console.log('Discord-Servers i am connected to: ', Guilds);
            console.log(
                'Connected to a total of: ' +
                    client.guilds.cache.size +
                    " Discord-Server's."
            );
            console.log('');
            //getData(client, Guild, connection, guildConfig);

            let setupDBData = () => {
                setupData(client, connection).then(
                    (success) => {
                        validateData(client, connection).then((success) => {
                            console.log(`${client.user.tag} is Ready!`);
                        });
                    },
                    (reject) => {
                        setTimeout(() => {
                            setupDBData();
                        }, 3000);
                    }
                );
            };
            setupDBData();
        });
    },
    onVoiceStateUpdate: (client) => {
        client.on('voiceStateUpdate', async (___, newState) => {
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
        client.on('presenceUpdate', (oldPresence, newPresence) => {});
    },
    onRateLimit: (client) => {
        client.on('rateLimit', (rateLimitInfo) => {});
    },
    onTypingStart: (client) => {
        client.on('typingStart', (channel, user) => {});
    },
    onInvalidated: (client) => {
        client.on('invalidated', () => {});
    },
    onUserUpdate: (client) => {
        client.on('userUpdate', (oldUser, newUser) => {});
    },
    onWebhookUpdate: (client) => {
        client.on('webhookUpdate', (channel) => {});
    }
};
