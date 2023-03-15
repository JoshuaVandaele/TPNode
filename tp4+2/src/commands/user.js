const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Operations concerning a user')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a user')
                .addStringOption(option =>
                    option.setName("name")
                        .setDescription("name of the user to create")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('find')
                .setDescription('Find a user')
                .addStringOption(option =>
                    option.setName("name")
                        .setDescription("name of the user to find")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Edit a user')
                .addStringOption(option =>
                    option.setName("oldname")
                        .setDescription("old name of the user")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("newname")
                        .setDescription("new name for the user")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List users'),
        ),
    async execute(interaction) {
        let message = ""
        let name = ""
        console.log(interaction.options._subcommand)
        switch (interaction.options._subcommand) {
            case "edit":
                const newname = interaction.options.getString("newname")
                const oldname = interaction.options.getString("oldname")
                const edit = await request(`http://localhost:3000/users/edit?oldname=${oldname}&newname=${newname}`)
                try {
                    const edit_json = await edit.body.json()
                    message = `Renamed ${oldname} to ${newname}`
                } catch {
                    message = `User ${oldname} doesn't exist!`
                }
                break;
            case "create":
                name = interaction.options.getString("name")
                const create = await request(`http://localhost:3000/users/create?name=${name}`)
                try {
                    const create_json = await create.body.json()
                    message = "Created a new user: `" + create_json.insertedId + "` - " + name
                } catch {
                    message = "User already exists!"
                }
                break;

            case "list":
                const user_list = await request("http://localhost:3000/users/list");
                const user_list_json = await user_list.body.json()
                message = "User list:\n"
                user_list_json.forEach(user => {
                    message += "`" + user._id + "` - " + user.name + "\n"
                });
                break;
            case "find":
                name = interaction.options.getString("name")
                const user = await request(`http://localhost:3000/users/find?name=${name}`);
                try {
                    const user_json = await user.body.json();
                    message = "`" + user_json._id + "` - " + user_json.name + "\n"
                } catch {
                    message = "User not found!"
                }
                break;
            default:
                message = "Command `user " + interaction.options._subcommand + "` executed"
                break;
        }
        await interaction.reply(message)
    },
};
