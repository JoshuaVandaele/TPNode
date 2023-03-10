const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about a user or a server!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Get some basic user info'),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Get some basic server info'),
		),
	async execute(interaction) {
		if (interaction.options._subcommand == "user") {
			await interaction.reply(interaction.member.user.toString() + '" joined the server at ' + interaction.member.joinedAt);
		} else if (interaction.options._subcommand == "server") {
			await interaction.reply('The guild "' + interaction.guild.name + '" has ' + interaction.guild.memberCount + ' members.');
		}
	},
};
