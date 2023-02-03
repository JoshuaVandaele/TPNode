const { insertOne, findOne, updateOne } = require('../services/db/crud')

async function getUserId(username) {
    const result = await findOne("users", {name: username});
    return result._id
}  

async function createWatchlist(req, res, next) {
    try {
        const user_id = await getUserId(req.params.username)
        console.log(user_id)
        if (!user_id) {return next("Invalid username")}
        if (!req.query.name) {return next("Invalid watchlist name")}
        const result = await insertOne("watchlists", {name: req.query.name, movies: [], desc:"", owner: user_id})
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


module.exports = {
  createWatchlist,
  findWatchlist
};
