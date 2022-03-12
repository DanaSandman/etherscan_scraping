const dbService = require('../servises/db.service');

async function save(item) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.insertOne(item)
    } catch (err) {
        // logger.error('cannot insert item', err)
        throw err
    }
}
module.exports = {
    save,
}