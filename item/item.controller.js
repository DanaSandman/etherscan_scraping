const itemService = require('./item.service')

module.exports = {
    saveItem,
    getItems,
    getWeekItems
}
//ADD
async function saveItem(item, collectionName) {
    console.log('save contriller', collectionName );
    try {
        itemService.save(item, collectionName);
    } catch (err) {
        // logger.error('Failed to add item', err)
        // res.status(500).send({
        err: 'Failed to add item'
        // })
    }
};

//LIST
async function getItems() {
    console.log('get items controller');
    try {
        const items = await itemService.query();
        console.log('controller after queryyy');
        return items
    } catch (err) {
        // res.status(500).send({
        err: 'Failed to get nfts'
        // })
    }
};

async function getWeekItems() {
    console.log('get items controller');
    try {
        const items = await itemService.queryWeeks();
        console.log('controller after queryWeeks');
        return items
    } catch (err) {
        // res.status(500).send({
        err: 'Failed to get nfts'
        // })
    }
};