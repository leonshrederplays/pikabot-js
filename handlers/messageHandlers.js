module.exports = {
	onMessage: (client) => {
		client.on('message', (message) => {

		})
	},
	onMessageDelete: (client) => {
		client.on('messageDelete', (message) => {

		})
	},
	onMessageDeleteBulk: (client) => {
		client.on('messageDeleteBulk', (messages) => {

		})
	},
	onMessageReactionAdd: (client) => {
		client.on('messageReactionAdd', (messageReaction, user) => {

		})
	},
	onMessageReactionRemove: (client) => {
		client.on('messageReactionRemove', (messageReaction, user) => {

		})
	},
	onMessageReactionRemoveAll: (client) => {
		client.on('messageReactionRemoveAll', (message) => {

		})
	},
	onMessageReactionRemoveEmoji: (client) => {
		client.on('messageReactionRemoveEmoji', (reaction) => {

		})
	},
	onMessageUpdate: (client) => {
		client.on('messageUpdate', (oldMessage, newMessage) => {

		})
	},
}