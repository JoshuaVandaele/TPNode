const { connectTodB, getCollection } = require('./connection');
const conf = require('../../../conf.json');

describe('Database connection', () => {
    test('Connect to the database', async () => {
        success = true
        try {
            client = await connectTodB();
            client.close();
        } catch (error) {
            success = false
            console.error(error);
        }
        expect(success).toBe(true);
    });

});

describe('Collection retrieval', () => {
    const COLLECTION_NAME = 'users';

    test(`Retrieve the collection '${COLLECTION_NAME}'`, async () => {
        client = await connectTodB();

        const collection = getCollection(COLLECTION_NAME);
        expect(collection.collectionName).toBe(COLLECTION_NAME);
        client.close()
    });
});
