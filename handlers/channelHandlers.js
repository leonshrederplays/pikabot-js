module.exports = {
	onChannelCreate: (client) => {
		client.on('channelCreate', (channel) => {

		})
	},
	onChannelDelete: (client) => {
		client.on('channelDelete', (channel) => {
		
		})
	},
	onChannelUpdate: (client) => {
		client.on('channelUpdate', (oldChannel, newChannel) => {
		
		})
	},
	onChannelPinsUpdate: (client) => {
		client.on('channelPinsUpdate', (channel, time) => {
		
		})
	}
}