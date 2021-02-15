module.exports = {
	onShardDisconnect: (client) => {
		client.on('shardDisconnect', (event, id) => {

		})
	},
	onShardError: (client) => {
		client.on('shardError', (error, id) => {

		})
	},
	onShardReady: (client) => {
		client.on('shardReady', (id, unavailableGuilds) => {

		})
	},
	onShardReconnecting: (client) => {
		client.on('shardReconnecting', (id) => {

		})
	},
	onShardDisconnect: (client) => {
		client.on('shardResume', (id, replayedEvents) => {

		})
	},
}