const MongoClient = require('mongodb').MongoClient
const config = require('../config');

const dbName = 'ETHER_BURN_DB'// MongoDB Atlas - prod
// const dbName = 'ETHER_BURN_DB_LOCAL'// MongoDB Local - dev

var dbConn = null

async function getCollection(collectionName) {
    console.log('collection name', collectionName);
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        // console.log('collection', collection);
        return collection
    } catch (err) {
        console.log('Failed to get Mongo collection', err);
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        // logger.error('Cannot Connect to DB', err)
        console.log('Cannot Connect to DB', err);
        throw err
    }
}

module.exports = {
    getCollection
}