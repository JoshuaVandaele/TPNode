const { ObjectId } = require('mongodb');
const { insertOne, findOne, updateOne, deleteOne, find } = require('../services/db/crud')

async function getUserId(username) {
    const result = await findOne("users", { name: username });
    return result._id
}

async function getOwnerId(watchlist) {
    const result = await findOne("watchlists", watchlist);
    if (result) {
        return result.owner
    }
    return null;
}

async function createWatchlist(req, res, next) {
    try {
        const user_id = await getUserId(req.params.username)
        console.log(user_id)
        if (!user_id) { return next("Invalid username") }
        if (!req.query.name) { return next("Invalid watchlist name") }
        const result = await insertOne("watchlists", { name: req.query.name, movies: [], desc: "", owner: user_id })
        return res.send(result)
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

async function findWatchlist(req, res, next) {
    try {
        const result = await findOne("watchlists", req.query);
        return res.send(result);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

async function addMovieToWatchlist(req, res, next) {
    try {
        if (req.query.id) {
            const id = new ObjectId(req.query.id)
            const movie = await findOne("movies", { _id: id });
            if (movie) {
                const watchlist = { name: req.query.name }
                if ((await getOwnerId(watchlist)).equals(await getUserId(req.params.username))) {
                    const result = await updateOne("watchlists", { name: req.query.name }, { $addToSet: { movies: [id] } })
                    return res.send(result)
                }
                else {
                    return next("You do not own this watchlist")
                }
            } else {
                return next("Movie doesn't exist")
            }
        } else {
            return next("Missing argument")
        }
    } catch (e) {
        console.log(e)
        return next(e);
    }
}

async function removeMovieFromWatchlist(req, res, next) {
    try {
        if (req.query.id) {
            const id = new ObjectId(req.query.id)
            const movie = await findOne("movies", { _id: id });
            if (movie) {
                const watchlist = { name: req.query.name }
                if ((await getOwnerId(watchlist)).equals(await getUserId(req.params.username))) {
                    const result = await updateOne("watchlists", { name: req.query.name }, { $pull: { movies: [id] } })
                    return res.send(result)
                }
                else {
                    return next("You do not own this watchlist")
                }
            } else {
                return next("Movie doesn't exist")
            }
        } else {
            return next("Missing argument")
        }
    } catch (e) {
        console.log(e)
        return next(e);
    }
}

async function deleteWatchlist(req, res, next) {
    try {
        const watchlist = { name: req.query.name }
        if ((await getOwnerId(watchlist)).equals(await getUserId(req.params.username))) {
            const result = await deleteOne("watchlists", { name: req.query.name })
            return res.send(result)
        }
        else {
            return next("You do not own this watchlist")
        }
    } catch (e) {
        console.log(e)
        return next(e);
    }
}

async function findMovies(req, res, next) {
    try {
        const watchlist = { name: req.query.name }
        if ((await getOwnerId(watchlist)).equals(await getUserId(req.params.username))) {
            let filter = {}
            let movies = [];
            if (req.query.lang) {
                filter["language"] = req.query.lang
            }
            if (req.query.rating) {
                filter["rating"] = req.query.rating
            }
            if (req.query.year) {
                filter["year"] = year
            }
            const result = await (await find("watchlists", { name: req.query.name })).toArray()
            console.log(result)
            for (const movie_id of result[0].movies) {
                let data = await findOne("movies", { _id: movie_id[0] })
                for (const key in filter) {
                    if (data[key] != filter[key]) {
                        data = null
                        break;
                    }
                }
                if (data) {
                    movies.push(data)
                }
            };
            console.log("movies")
            console.log(movies)
            return res.send(movies)
        }
        else {
            return next("You do not own this watchlist")
        }
    } catch (e) {
        console.log(e)
        return next(e)
    }
}

module.exports = {
    createWatchlist,
    findWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    deleteWatchlist,
    findMovies
};
