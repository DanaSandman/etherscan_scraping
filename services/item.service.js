const dbService = require('../services/db.service');

//SAVE
async function save(item) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.insertOne(item)
    } catch (err) {
        // logger.error('cannot insert item', err)
        throw err
    }
};
//QUERY
async function query(filterBy = {}) {
    console.log('query service');
    criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('item')
        const items = await collection.find().limit(3).toArray()
        return items
    } catch (err) {
        // logger.error('cannot find items', err)
        console.log('cannot find items', err);
        throw err
    }
};

module.exports = {
    save,
    query
};

function _buildCriteria(filterBy) {
    const criteria = {}
    // const tokenId = (filterBy.tokenId) ? filterBy.tokenId : ''
    // if (filterBy.tokenId) {
    //     criteria.$or = [{
    //         tokenId: parseFloat(tokenId + '.0')
    //     }, ]
    // }
    return criteria
};