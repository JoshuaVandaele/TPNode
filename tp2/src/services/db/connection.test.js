const MongoClient = require('mongodb').MongoClient;
let { connectTodB, getCollection } = require('./connection');
const conf = require('../../../conf.json');

// Mock MongoClient class
jest.mock('mongodb', () => {
    const MongoClientMock = {
        connect: jest.fn(),
        close: jest.fn(),
        db: jest.fn(),
    };
    return { MongoClient: jest.fn(() => MongoClientMock) };
});

describe('database connection', () => {
    let client;

    beforeEach(() => {
        client = new MongoClient(conf.tp2.databaseUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('successfully connects to the database', async () => {
        // Setup
        client.db.mockReturnValueOnce({
            command: jest.fn().mockResolvedValueOnce({ ok: 1 }),
        });

        // Execute
        const result = await connectTodB();

        // Assert
        expect(result).toBe(client);
    });

    test('fails to connect to the database', async () => {
        // Setup
        client.connect.mockRejectedValueOnce(new Error('Connection error'));

        // Execute and assert
        await expect(connectTodB()).rejects.toThrow('Connection error');
        expect(client.close).toHaveBeenCalled();
    });

    test('encounters an error during the ping command', async () => {
        // Setup
        client.db.mockReturnValueOnce({
            command: jest.fn().mockRejectedValueOnce(new Error('Ping error')),
        });

        // Execute and assert
        await expect(connectTodB()).rejects.toThrow('Ping error');
        expect(client.close).toHaveBeenCalled();
    });
});

describe('Get collection', () => {
    let client;

    beforeEach(() => {
        client = new MongoClient(conf.tp2.databaseUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    const FAKE_COLLECTION_NAME = 'HERES-A MY BROTHER LUIGI NOW TO TELL YOU A WHOLE HEAPIN A SPAGHETTI PILE OF INFORMACHIONE!';
    test('Gets the specified collection', () => {
        // Setup
        const collectionMock = {};
        client.db.mockReturnValueOnce({
            collection: jest.fn().mockReturnValueOnce(collectionMock),
        });

        // Execute
        const result = getCollection(FAKE_COLLECTION_NAME);

        // Assert
        expect(result).toEqual({});
    });

    test('throws an error when called with an invalid collection name', () => {
        expect(() => getCollection(95)).toThrow(
            'Invalid collection name'
        );

        expect(() => getCollection('')).toThrow(
            'Invalid collection name'
        );
    });
});
