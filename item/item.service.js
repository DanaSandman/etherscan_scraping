const dbService = require('../services/db.service');

//SAVE
async function save(item, collectionType) {
    try {
        // const collection = await dbService.getCollection('item')
        const collection = await dbService.getCollection(collectionType)
        await collection.insertOne(item)
    } catch (err) {
        // logger.error('cannot insert item', err)
        throw err
    }
};
//QUERY
async function query(start) {
    // console.log('query service', filterBy);
    // criteria = _buildCriteria(filterBy);
    console.log('start',start);
    
    try {
        const collection = await dbService.getCollection('item');
        // const items = await collection.find(filterBy).limit(3).toArray();
        const items = await collection.find().skip(start).limit(7).toArray();
        // const items = await collection.find( { qty: { $gt: 4 } } ).toArray();
        // const items = await collection.find().limit(3).toArray()+
        console.log('iteems from service length',items.length );
        // console.log('iteems from service length',items);
        return items
    } catch (err) {
        // logger.error('cannot find items', err)
        console.log('cannot find items', err);
        throw err
    }
};
// queryWeeks()
async function queryWeeks(){
    try {
    const collection = await dbService.getCollection('week');
    const weeks = await collection.find().toArray();
    console.log('iteems from service length',weeks );
    return weeks
} catch (err) {
    // logger.error('cannot find items', err)
    console.log('cannot find weeks', err);
    throw err
}
};
module.exports = {
    save,
    query,
    queryWeeks
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