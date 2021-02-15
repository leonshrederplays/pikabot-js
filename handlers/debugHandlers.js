module.exports = {
	onError: (client) => {
		client.on('error', console.error);
	},
	onWarn: (client) => {
		client.on('warn', console.warn);
	},
	onDebug: (client) => {
		client.on('debug', console.debug);
	}
}