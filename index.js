require('log-timestamp')(function() { return "[" + new Date().toLocaleDateString().replace(/(\[.*\])/gm, "") + " | " +  new Date().toLocaleTimeString() + "." + new Date().toISOString().split("T")[1].replace(/(.*:*\d[.])/gm, "").replace("Z", "") +  "]"});
require('dotenv').config();
const { CommandoClient } = require('discord.js-commando');
const { Structures, MessageEmbed, MessageAttachment, Message } = require('discord.js');

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
        unknownCommand: false,
    })
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

//Get a Connection to the Discord-Database.
let dcConnection, twConnection;
const { dcConnect, twConnect } = require('./sql/connectionHandler.js'); // Require functions.

async function connectDC() {
    dcConnection = await dcConnect();
}
//Get a Connection to the Twitch-Database.
async function connectTW() {
    twConnection = await twConnect();
}
connectDC(); // Do connect.
connectTW(); // Do connect.

setTimeout(getConnection, 3000); // Wait for response...
function getConnection() {
    if (dcConnection === 'ERROR') {
        // Retry to get connection.
        connectDC();
        return setTimeout(getConnection, 3000);
    } else if (twConnection === 'ERROR') {
        // Retry to get connection.
        connectTW();
        return setTimeout(getConnection, 3000);
    }

    // Initialize Database and start Listeners...
    initBot();
}

const { sqlInit } = require('./sql/sqlInit'); // Initialize Database.
function initBot() {
    sqlInit(dcConnection); // Initialize Database.
    startListeners(); // Start the Bot...
}

// Require OtherHandlers.
const { 
  onReady,
  onVoiceStateUpdate
} = require('./handlers/otherHandlers');
// Require GuildHandlers.
const { 
  onGuildCreate,
  onGuildDelete,
  onGuildMemberAdd,
  onGuildMemberRemove
} = require('./handlers/guildHandlers');
// Require DebugHandlers.
const {
  onDebug,
  onError,
  onWarn
} = require('./handlers/debugHandlers');
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
    client.dispatcher.addInhibitor(message => {
        if(message.command === null) return(false);
        let guildSettings = message.guild.guildSettings;
        if(guildSettings.cmdChannel != null) {
            if(guildSettings.cmdMusicChannel != null && message.command.group.id === 'music' && message.channel.id === guildSettings.cmdMusicChannel) return(false);

            if(message.channel.id != guildSettings.cmdChannel) {
                message.delete();
                return(message.reply(`Normale Befehle können nur in: <#${guildSettings.cmdChannel}> benutzt werden.`).then(msg => msg.delete({timeout: 5000})).catch(e => console.log(e)));
            } else {
                if(guildSettings.cmdMusicChannel != null && message.command.group.id === 'music' && message.channel.id === guildSettings.cmdChannel) {
                    message.delete();
                    return(message.reply(`Musik Befehle können nur in: <#${guildSettings.cmdMusicChannel}> benutzt werden.`).then(msg => msg.delete({timeout: 5000})).catch(e => console.log(e)));
                }
            }
        }
    })
    client.login(process.env.TOKEN);
}