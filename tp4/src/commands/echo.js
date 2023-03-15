const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your own message!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Text to echo back')
                .setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString("input")
		await interaction.reply(input);
	},
};
