const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

// TODO: Be able to use watchlists IDs in case we have watchlists with identical names

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
                .addStringOption(option =>
                    option.setName("username")
                        .setDescription("username of the watchlist owner")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('find')
                .setDescription('Find a watchlist')
                .addStringOption(option =>
                    option.setName("name")
                        .setDescription("name of the watchlist to find")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List a users watchlists')
                .addStringOption(option =>
                    option.setName("username")
                        .setDescription("username of the watchlists owner")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('anotate')
                .setDescription('Annotate a watchlist with a comment')
                .addStringOption(option =>
                    option.setName("username")
                        .setDescription("username of the watchlists owner")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("watchlist")
                        .setDescription("name of the watchlist")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("comment")
                        .setDescription("comment to add to the watchlist")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('listmovies')
                .setDescription('List movies in a watchlist')
                .addStringOption(option =>
                    option.setName("watchlist")
                        .setDescription("name of the watchlist")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("username")
                        .setDescription("username of the watchlist owner")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('addmovie')
                .setDescription('Add a movie to a watchlist')
                .addStringOption(option =>
                    option.setName("watchlist")
                        .setDescription("name of the watchlist")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("movie")
                        .setDescription("name of the movie to add")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("username")
                        .setDescription("username of the watchlist owner")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('removemovie')
                .setDescription('Remove a movie from a watchlist')
                .addStringOption(option =>
                    option.setName("watchlist")
                        .setDescription("name of the watchlist")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("movie")
                        .setDescription("name of the movie to remove")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("username")
                        .setDescription("username of the watchlists owner")
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        let message = "";
        let name = "";
        console.log(interaction.options._subcommand);
        switch (interaction.options._subcommand) {
            case "create":
                name = interaction.options.getString("name");
                username = interaction.options.getString("username");
                const create = await request(`http://localhost:3000/users/${username}/watchlist/create?name=${name}`);
                try {
                    const create_json = await create.body.json();
                    message = "Created a new watchlist: `" + create_json.insertedId + "` - " + name;
                } catch {
                    message = "Watchlist already exists!";
                }
                break;

            case "find":
                name = interaction.options.getString("name");
                const watchlist = await request(`http://localhost:3000/users/dummy/watchlist/find?name=${name}`);
                try {
                    const watchlist_json = await watchlist.body.json();
                    message = "`" + watchlist_json._id + "` - " + watchlist_json.name + " contains " + watchlist_json.movies.length + " movies.\n";
                    message += "Note: " + watchlist_json.note + "\n"
                } catch {
                    message = "Watchlist not found!";
                }
                break;


            case "addmovie":
                name = interaction.options.getString("watchlist");
                username = interaction.options.getString("username");
                movie_id = interaction.options.getString("movie");
                const add_movie = await request(`http://localhost:3000/users/${username}/watchlist/addmovie?name=${name}&id=${movie_id}`);
                try {
                    const add_movie_json = await add_movie.body.json();
                    message = `Added movie "${movie_id}" to watchlist "${name}"`;
                } catch {
                    message = "Failed to add movie!";
                }
                break;

            case "removemovie":
                name = interaction.options.getString("watchlist");
                username = interaction.options.getString("username");
                movie_id = interaction.options.getString("movie");
                const remove_movie = await request(`http://localhost:3000/users/${username}/watchlist/removemovie?name=${name}&id=${movie_id}`);
                try {
                    const remove_movie_json = await remove_movie.body.json();
                    message = `Removed movie "${movie_id}" from watchlist "${name}"`;
                } catch {
                    message = "Failed to remove movie!";
                }
                break;

            case "listmovies":
                name = interaction.options.getString("watchlist");
                username = interaction.options.getString("username");
                const list_movies = await request(`http://localhost:3000/users/${username}/watchlist/listmovies?name=${name}`);
                try {
                    const list_movies_json = await list_movies.body.json();
                    message = `Movies in watchlist "${name}":\n`;
                    list_movies_json.forEach(movie => {
                        message += `- ${movie.name}\n`;
                    });
                } catch {
                    message = "Failed to list movies!";
                }
                break;

            case "list":
                username = interaction.options.getString("username");
                const list_watchlists = await request(`http://localhost:3000/users/${username}/watchlist/list`);
                try {
                    const list_watchlists_json = await list_watchlists.body.json();
                    message = "Watchlist list:\n";
                    list_watchlists_json.forEach(watchlist => {
                        message += "`" + watchlist._id + "` - " + watchlist.name + "\n";
                    });
                } catch {
                    message = "Failed to list watchlists!";
                }
                break;

            case "anotate":
                const watchlist_name_an = interaction.options.getString("watchlist");
                const comment = interaction.options.getString("comment");
                username = interaction.options.getString("username");
                const annotate = await request(`http://localhost:3000/users/${username}/watchlist/anotate?name=${watchlist_name_an}&note=${comment}`);
                try {
                    const annotate_json = await annotate.body.json();
                    message = `Added comment "${comment}" to watchlist "${watchlist_name_an}"`;
                } catch {
                    message = "Failed to add comment!";
                }
                break;

            default:
                message = "Command `watchlist " + interaction.options._subcommand + "` executed";
                break;
        }
        await interaction.reply(message);
    },
};