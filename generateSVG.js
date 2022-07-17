const {
    getItems,
    saveItem
} = require('./item.controller');

const {
    setData
} = require('./SVG_Generator/data');

const {
    generateCardSVG
} = require("./SVG_Generator/util");


async function generateSvg() {

    const itemsData = await getItems();

    console.log('itemsData', itemsData);

    itemsData.forEach(item => {

        const date = new Date(item.date)
        console.log('date', date);

        const title = `DAY ${getDayNum(date)}, ${date.getFullYear()}`
        // const title = `DAY ${getDayNum => (date)}}`

        console.log('title', title);

        const itemSum = item.blocksData.reduce(
            (previousValue, currentValue) => {

                // console.log('previousValue', previousValue);
                // console.log('currentValue', currentValue);


                return {
                    highestETHBurnt: (previousValue.highestETHBurnt < currentValue.burntFees) ? currentValue.burntFees : previousValue.highestETHBurnt,
                    highestReductionPresentage: previousValue.highestReductionPresentage < currentValue.burntFees / currentValue.reward ? currentValue.burntFees / currentValue.reward : previousValue.highestReductionPresentage,
                    lowerBaseFee: previousValue.lowerBaseFee === 0 || previousValue.lowerBaseFee > currentValue.baseFee ? currentValue.baseFee : previousValue.lowerBaseFee,
                    higherBaseFee: previousValue.higherBaseFee < currentValue.baseFee ? currentValue.baseFee : previousValue.higherBaseFee,
                    gasUsed: previousValue.gasUsed + currentValue.gasUsed
                }

            }, {
                highestETHBurnt: 0,
                highestReductionPresentage: 0,
                lowerBaseFee: 0,
                higherBaseFee: 0,
                gasUsed: 0
            })

        console.log('itemSum', itemSum);

        const _highestETHBurnt = itemSum.highestETHBurnt
        const _highestReductionPresentage = itemSum.highestReductionPresentage
        const _baseFee = `${itemSum.lowerBaseFee} - ${itemSum.higherBaseFee}`
        const _gasUsed = itemSum.gasUsed

        const reduction = (item.totalBurnt / item.totalreward)
        // console.log('reduction', reduction);

        const blocks = item.blocksData.length
        console.log('blocks');
        // console.log('blocks', blocks);

        const cardData = setData(item, title, _highestETHBurnt, _highestReductionPresentage,
            reduction,
            _baseFee, blocks, _gasUsed);
        console.log('cardData');    

        (async () => {
            try {
                console.log('making card svg');
                const cardSVG = await generateCardSVG(cardData.CARD_CONFIG, cardData.CARD_CONFIG);
                console.log('cardSVG', cardSVG);
                const svgToSave = {
                    svgLink: cardSVG,
                    // tokenId: i,
                    item_id: item._id
                }
                console.log('cars to save');
                saveItem(svgToSave, 'svg_day')
            } catch (e) {
                console.log("Error: ", e.message);
            }
        })();
    });

};
generateSvg();

function getDayNum(date) {
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = date - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    // console.log('Day of year: ' + day);
    return day
};