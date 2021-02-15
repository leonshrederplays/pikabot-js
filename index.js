require('log-timestamp')(function () {
    return (
        '[' +
        new Date().toLocaleDateString().replace(/(\[.*\])/gm, '') +
        ' | ' +
        new Date().toLocaleTimeString() +
        '.' +
        new Date()
            .toISOString()
            .split('T')[1]
            .replace(/(.*:*\d[.])/gm, '')
            .replace('Z', '') +
        ']'
    );
});
require('dotenv').config();
const { CommandoClient } = require('discord.js-commando');
const {
    Structures,
    MessageEmbed,
    MessageAttachment,
    Message
} = require('discord.js');

// Require Structure.
const { createStructure } = require('./classes/GuildConfig');
// Create Structure.
createStructure();

const client = new CommandoClient({
    commandPrefix: '!', // Standard Prefix of Bot.
    owner: '324938553937100815', // Owner-ID of Bot in this case: Leon|ShrederPlays#2076.
    unknownCommandResponse: false, // Wether to response to wrong Commands or not.
    invite: 'https://discord.gg/br2at6E' // Invite to Bot's Support-Server.
});
// Define Groups and register them.
const path = require('path');
client.registry
    // Registers your custom command groups
    .registerGroups([
        ['fun', 'Fun commands'],
        ['music', 'Music commands'],
        ['info', 'Information commands'],
        ['mod', 'Moderation commands'],
        ['config', 'Configuration commands'],
        ['other', 'Other commands'],
        ['gifs', 'Gif commands'],
        ['memes', 'Meme commands'],
        ['dev', 'Developer commands']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaultGroups()
    .registerDefaultTypes()
    .registerDefaultCommands({
        unknownCommand: false
    })
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

// Require Handlers and etc...
// Require OtherHandlers.
const { onReady, onVoiceStateUpdate } = require('./handlers/otherHandlers');
// Require GuildHandlers.
const {
    onGuildCreate,
    onGuildDelete,
    onGuildMemberAdd,
    onGuildMemberRemove
} = require('./handlers/guildHandlers');
// Require DebugHandlers.
const { onDebug, onError, onWarn } = require('./handlers/debugHandlers');

// Predefine variables to store Database connection.
let dcConnection, twConnection;
// Require connect functions.
const { dcConnect, twConnect } = require('./sql/connectionHandler.js');
// Require initialize Database function.
const { sqlInit } = require('./sql/sqlInit');
connectToDatabase();
function connectToDatabase() {
    dcConnect.then(
        (dcConn) => {
            // Save Connection to variable.
            dcConnection = dcConn;
            let twConnector = () => {
                twConnect.then(
                    (twConn) => {
                        // Save connection to variable.
                        twConnection = twConn;
                        setupDatabase();
                    },
                    (error) => {
                        setTimeout(() => {
                            twConnector();
                        }, 3000);
                    }
                );
            };
            twConnector();
        },
        (error) => {
            discordConnection();
        }
    );
}

function setupDatabase() {
    let initDB = () => {
        // Initialize Database.
        sqlInit(dcConnection).then(
            (success) => {
                startListeners(); // Start the Bot...
            },
            (failed) => {
                setTimeout(() => {
                    initDB();
                }, 3000);
            }
        );
    };
    initDB();
}

// Function to start all the Listeners and initialize Database.
function startListeners() {
    onError(client);
    //onDebug(client);
    onWarn(client);
    onReady(client, dcConnection);
    onGuildCreate(client, dcConnection);
    onGuildDelete(client, dcConnection);
    onGuildMemberAdd(client, MessageEmbed);
    onGuildMemberRemove(client, MessageEmbed);
    onVoiceStateUpdate(client);
    // Login...
    client.dispatcher.addInhibitor((message) => {
        if (message.command === null) return false;
        let guildSettings = message.guild.guildSettings;
        if (guildSettings.cmdChannel != null) {
            if (
                guildSettings.cmdMusicChannel != null &&
                message.command.group.id === 'music' &&
                message.channel.id === guildSettings.cmdMusicChannel
            )
                return false;

            if (message.channel.id != guildSettings.cmdChannel) {
                message.delete();
                return message
                    .reply(
                        `Normale Befehle können nur in: <#${guildSettings.cmdChannel}> benutzt werden.`
                    )
                    .then((msg) => msg.delete({ timeout: 5000 }))
                    .catch((e) => console.log(e));
            } else {
                if (
                    guildSettings.cmdMusicChannel != null &&
                    message.command.group.id === 'music' &&
                    message.channel.id === guildSettings.cmdChannel
                ) {
                    message.delete();
                    return message
                        .reply(
                            `Musik Befehle können nur in: <#${guildSettings.cmdMusicChannel}> benutzt werden.`
                        )
                        .then((msg) => msg.delete({ timeout: 5000 }))
                        .catch((e) => console.log(e));
                }
            }
        }
    });
    client.login(process.env.TOKEN);
}
