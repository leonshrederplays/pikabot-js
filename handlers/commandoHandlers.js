module.exports = {
	onCommandBlock: (client) => {
		client.on('commandBlock', (message, reasom, data) => {

		})
	},
	onCommandCancel: (client) => {
		client.on('commandCancel', (command, reason, message, result) => {

		})
	},
	onCommandError: (client) => {
		client.on('commandError', (command, err, message, args, fromPattern, result) => {

		})
	},
	onCommandPrefixChange: (client) => {
		client.on('commandPrefixChange', (guild, prefix) => {

		})
	},
	onCommandRegister: (client) => {
		client.on('commandRegister', (command, registry) => {

		})
	},
	onCommandReregister: (client) => {
		client.on('commandReregister', (newCommand, oldCommand) => {

		})
	},
	onCommandRun: (client) => {
		client.on('commandRun', (command, promise, message, args, fromPattern, result) => {

		})
	},
	onCommandStatusChange: (client) => {
		client.on('commandStatusChange', (guild, command, enabled) => {

		})
	},
	onCommandUnregister: (client) => {
		client.on('commandUnregister', (command) => {

		})
	},
	onGroupRegister: (client) => {
		client.on('groupRegister', (group, registry) => {

		})
	},
	onGroupStatusChange: (client) => {
		client.on('groupStatusChange', (guild, group, enabled) => {

		})
	},
	onProviderReady: (client) => {
		client.on('providerReady', (provider) => {

		})
	},
	onTypeRegister: (client) => {
		client.on('typeRegister', (type, registry) => {

		})
	},
	onUnknownCommand: (client) => {
		client.on('unknownCommand', (message) => {

		})
	},
}