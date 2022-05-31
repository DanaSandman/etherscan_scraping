const itemService = require('./services/item.service')

module.exports = {
    saveItem,
    getItems
}
//ADD
async function saveItem(item) {
    try {
        itemService.save(item)
    } catch (err) {
        // logger.error('Failed to add item', err)
        // res.status(500).send({
            err: 'Failed to add item'
        // })
    }
};

//LIST
async function getItems() {
    try {
        const items = await itemService.query()
        return items
    } catch (err) {
        // res.status(500).send({
            err: 'Failed to get nfts'
        // })
    }
};


