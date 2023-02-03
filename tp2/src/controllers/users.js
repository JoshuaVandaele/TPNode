const { insertOne, findOne, updateOne } = require('../services/db/crud')

async function findUser(req, res, next) {
  try {
    const result = await findOne("users", { name: "toto" })
    return res.send(result)
  } catch (e) {
    console.log(e)
  }
}

async function createUser(req, res, next) {
  try {
    const result = await insertOne("users", { name: "toto" })
    return res.send(result)
  } catch (e) {
    console.log(e)
  }
}

async function editUser(req, res, next) {
  try {
    const result = await updateOne("users", { name: "toto" }, { name: "toto2"})
    return res.send(result)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createUser,
  findUser,
  editUser
};
