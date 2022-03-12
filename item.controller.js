const itemService = require('./servises/item.service')

module.exports = {
    saveItem,
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
}

