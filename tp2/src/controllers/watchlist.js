const { ObjectId } = require('mongodb');
const { insertOne, findOne, updateOne, deleteOne } = require('../services/db/crud')

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
                const watchlist = {name: req.query.name}
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
                const watchlist = {name: req.query.name}
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

module.exports = {
    createWatchlist,
    findWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist
};
