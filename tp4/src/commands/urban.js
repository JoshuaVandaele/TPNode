const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Replies with a random urbandictionary definition, or the one passed as a parameter')
		.addStringOption(option =>
			option.setName('word')
				.setDescription('Word to define')
		),
	async execute(interaction) {
		const input = interaction.options.getString("word")
		let definitions = null;

		if (!input) {
			definitions = await request("https://api.urbandictionary.com/v0/random")
		} else {
			definitions = await request("https://api.urbandictionary.com/v0/define?term=" + input)
		}
		const results = await definitions.body.json()
		const result = results["list"][0]

		const definition = result["definition"]
		const word = result["word"]


		const message = "**" + word + "** - " + definition

		await interaction.reply(message)
	},
};
