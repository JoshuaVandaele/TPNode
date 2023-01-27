const { getCollection } = require('./connection');

async function findOne(collectionName, query, options = {}) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.findOne(query, options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
        console.log(e);
        throw e;
    }
}

async function find(collectionName, query, options = {}) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.find(query, options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
        console.log(e);
        throw e;
    }
}

async function insertOne(collectionName, doc) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.insertOne(doc);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction insertOne avec les parametres suivants: ${doc}`);
        console.log(e);
        throw e;
    }
}

async function insertMany(collectionName, docs) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.insertMany(docs);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction insertMany avec les parametres suivantss: ${docs}`);
        console.log(e);
        throw e;
    }
}

async function updateOne(collectionName, query, update, options = {}) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.updateOne(query, update, options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction updateOne function with parameters: ${query}, ${update}`);
        console.log(e);
        throw e;
    }
}

async function updateMany(collectionName, query, update, options = {}) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.updateMany(query, update, options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction updateMany function with parameters: ${query}, ${update}`);
        console.log(e);
        throw e;
    }
}

async function replace(collectionName, query, doc, options = {}) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.replaceOne(query, doc, options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction replace function with parameters: ${query}, ${doc}`);
        console.log(e);
        throw e;
    }
}

async function deleteOne(collectionName, query, options = {}) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.deleteOne(query, options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction deleteOne function avec les parametres suivants: ${query}`);
        console.log(e);
        throw e;
    }
}

async function deleteMany(collectionName, query, options = {}) {
    try {
        const collection = getCollection(collectionName);
        const result = await collection.deleteMany(query, options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction deleteMany function avec les parametres suivants: ${query}`);
        console.log(e);
        throw e;
    }
}

module.exports = {
    find,
    findOne,
    insertOne,
    insertMany,
    updateOne,
    updateMany,
    replace,
    deleteOne,
    deleteMany
}