const { insertOne, findOne, updateOne } = require('../services/db/crud')



async function findUser(req, res, next) {
  try {
    const result = await findOne("users", req.query);
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function createUser(req, res, next) {
  try {
    const result = await insertOne("users", req.query)
    return res.send(result)
  } catch (e) {
    console.log(e)
    return next(e);
  }
}

async function editUser(req, res, next) {
  try {
    if (req.query.oldname && req.query.newname) {
      console.log({name: req.query.oldname})
      console.log(req.query.newname)
      const result = await updateOne("users", {name: req.query.oldname}, {$set:{name: req.query.newname}})
      return res.send(result)
    } else {
      res.send("Invalid request")
    }
  } catch (e) {
    console.log(e)
    return next(e);
  }
}

module.exports = {
  createUser,
  findUser,
  editUser
};
