const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Replies with a random urbandictionary definition'),
	async execute(interaction) {
		const definitions = await request("https://api.urbandictionary.com/v0/random")
		
		const results = await definitions.body.json()
		const result = results["list"][0]
		
		const definition = result["definition"]
		const word = result["word"]
		
		const message = "**" + word + "** - " + definition

		await interaction.reply(message)
	},
};
