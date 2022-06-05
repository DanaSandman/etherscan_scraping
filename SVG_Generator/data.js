function setData(rawDataItem, _title, highestETH, highestPresenage,
    _reduction,
    _baseFee, _blocks, _gasUsed) {

    const DATASET = rawDataItem.blocksData
    const CARD_CONFIG = {
        yVars: ["Burnt Fees", "Gas Used"],
        yLabels: [`${highestETH} ETH`, highestPresenage],

        // graph colors: order is back layer to front layer
        colors: ["#8cc500", "#1b8366", "#1b3e83"],
        cardWidth: 290,
        cardHeight: 500,
        // colors for the gradient
        startColor: "#333333",
        endColor: "#333333",
        // block elements
        fromBlock: rawDataItem.startBlock,
        toBlock: rawDataItem.endBlock,
        fromBlockFontColor: "#000",
        toBlockFontColor: "#fff",

        // var label color
        varColor: "#ffffff",

        // text elements
        title: _title,
        subtitle: rawDataItem.totalBurnt,
        subtitle_unit: "ETH",
        subtitle2: "BURNT",
        footer_text1: `Rewards (ETH): ${rawDataItem.totalreward} | Reduction: ${_reduction}`,
        footer_text2: `Base (Gwei): ${_baseFee}`,
        footer_text3: `Blocks: ${_blocks} | TXN: ${rawDataItem.totalTxn}`,
        footer_text4: `GAS USED (GWEI): ${_gasUsed}`,
        // font .ttf or .otf file URL - used to draw yVar labels
        // should be hosted on a web server and not relative path
        // fontTTFURL: "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/fonts/roboto/Roboto-Thin.ttf"
        fontTTFURL: "./Roboto-Thin.ttf"
    };

    return {
        DATASET,
        CARD_CONFIG
    }
}

module.exports = {
    setData,
}