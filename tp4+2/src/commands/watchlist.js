const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('watchlist')
        .setDescription('Operations concerning a watchlist')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a watchlist')
                .addStringOption(option =>
                    option.setName("name")
                        .setDescription("name of the watchlist to create")
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        let message = ""
        let name = ""
        console.log(interaction.options._subcommand)
        switch (interaction.options._subcommand) {
            default:
                message = "Command `watchlist " + interaction.options._subcommand + "` executed"
                break;
        }
        await interaction.reply(message)
    },
};
