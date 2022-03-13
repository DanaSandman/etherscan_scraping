const dbService = require('../servises/db.service');

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
    criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('item')
        const items = await collection.find(criteria).toArray()
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
