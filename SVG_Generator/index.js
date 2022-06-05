const {
    generateCardSVG
} = require("./util");
const {
    readFileSync
} = require("fs");

// read data
const data = [{
    "Block": 14067715,
    "Gas Used": 201320810,
    "Base Fee": 135.6,
    "Burnt Fees": 0.289229
}, {
    "Block": 14067716,
    "Gas Used": 3000090548,
    "Base Fee": 121.06,
    "Burnt Fees": 3.633205
}, {
    "Block": 14067717,
    "Gas Used": 2309620572,
    "Base Fee": 136.18,
    "Burnt Fees": 3.26327
}, {
    "Block": 14067718,
    "Gas Used": 2506350365,
    "Base Fee": 146.35,
    "Burnt Fees": 3.751816
}, {
    "Block": 14067719,
    "Gas Used": 1302500730,
    "Base Fee": 159.35,
    "Burnt Fees": 2.111566
}, {
    "Block": 14067720,
    "Gas Used": 508810386,
    "Base Fee": 157.03,
    "Burnt Fees": 0.923564
}, {
    "Block": 14067721,
    "Gas Used": 2200400006,
    "Base Fee": 145.09,
    "Burnt Fees": 3.197821
}, {
    "Block": 14067722,
    "Gas Used": 909320864,
    "Base Fee": 153.55,
    "Burnt Fees": 1.525209
}, {
    "Block": 14067723,
    "Gas Used": 208760521,
    "Base Fee": 147.03,
    "Burnt Fees": 0.422937
}, {
    "Block": 14067724,
    "Gas Used": 1506270761,
    "Base Fee": 132.16,
    "Burnt Fees": 2.065513
}, {
    "Block": 14067725,
    "Gas Used": 3000490455,
    "Base Fee": 132.84,
    "Burnt Fees": 3.991894
}, {
    "Block": 14067726,
    "Gas Used": 1802590313,
    "Base Fee": 149.43,
    "Burnt Fees": 2.728665
}, {
    "Block": 14067727,
    "Gas Used": 105740815,
    "Base Fee": 153.43,
    "Burnt Fees": 0.241627
}, {
    "Block": 14067728,
    "Gas Used": 2808450328,
    "Base Fee": 136.25,
    "Burnt Fees": 3.930431
}, {
    "Block": 14067729,
    "Gas Used": 2303140578,
    "Base Fee": 151.88,
    "Burnt Fees": 3.541121
}, {
    "Block": 14067730,
    "Gas Used": 407340026,
    "Base Fee": 162.29,
    "Burnt Fees": 0.768301
}, {
    "Block": 14067731,
    "Gas Used": 0,
    "Base Fee": 148.37,
    "Burnt Fees": 0
}, {
    "Block": 14067732,
    "Gas Used": 3000750287,
    "Base Fee": 129.83,
    "Burnt Fees": 3.904698
}, {
    "Block": 14067733,
    "Gas Used": 2106060124,
    "Base Fee": 146.04,
    "Burnt Fees": 3.155491
}, {
    "Block": 14067734,
    "Gas Used": 1700850835,
    "Base Fee": 154.03,
    "Burnt Fees": 2.631817
}, {
    "Block": 14067735,
    "Gas Used": 1207510779,
    "Base Fee": 156.69,
    "Burnt Fees": 1.998092
}, {
    "Block": 14067736,
    "Gas Used": 1802940272,
    "Base Fee": 153.75,
    "Burnt Fees": 2.812847
}, {
    "Block": 14067737,
    "Gas Used": 206500503,
    "Base Fee": 157.95,
    "Burnt Fees": 0.418657
}, {
    "Block": 14067738,
    "Gas Used": 604890722,
    "Base Fee": 141.69,
    "Burnt Fees": 0.919582
}, {
    "Block": 14067739,
    "Gas Used": 2907440610,
    "Base Fee": 131.64,
    "Burnt Fees": 3.915853
}, {
    "Block": 14067740,
    "Gas Used": 3000270212,
    "Base Fee": 147.82,
    "Burnt Fees": 4.438777
}, {
    "Block": 14067741,
    "Gas Used": 1509720433,
    "Base Fee": 166.3,
    "Burnt Fees": 2.656227
}, {
    "Block": 14067742,
    "Gas Used": 1406820663,
    "Base Fee": 167.6,
    "Burnt Fees": 2.46089
}, {
    "Block": 14067743,
    "Gas Used": 1101220861,
    "Base Fee": 167.1,
    "Burnt Fees": 1.858652
}, {
    "Block": 14067744,
    "Gas Used": 503060750,
    "Base Fee": 161.64,
    "Burnt Fees": 0.857797
}, {
    "Block": 14067745,
    "Gas Used": 3001480305,
    "Base Fee": 148.55,
    "Burnt Fees": 4.478727
}, {
    "Block": 14067746,
    "Gas Used": 1801040289,
    "Base Fee": 167.12,
    "Burnt Fees": 3.025611
}, {
    "Block": 14067747,
    "Gas Used": 1204860988,
    "Base Fee": 171.34,
    "Burnt Fees": 2.139542
}, {
    "Block": 14067748,
    "Gas Used": 1406860282,
    "Base Fee": 167.69,
    "Burnt Fees": 2.462864
}, {
    "Block": 14067749,
    "Gas Used": 404160079,
    "Base Fee": 167.21,
    "Burnt Fees": 0.73844
}, {
    "Block": 14067750,
    "Gas Used": 2700010128,
    "Base Fee": 152.44,
    "Burnt Fees": 4.116287
}, {
    "Block": 14067751,
    "Gas Used": 0,
    "Base Fee": 167.55,
    "Burnt Fees": 0
}, {
    "Block": 14067752,
    "Gas Used": 1401570534,
    "Base Fee": 146.61,
    "Burnt Fees": 2.075648
}, {
    "Block": 14067753,
    "Gas Used": 1504100532,
    "Base Fee": 145.51,
    "Burnt Fees": 2.242404
}, {
    "Block": 14067754,
    "Gas Used": 403630301,
    "Base Fee": 145.95,
    "Burnt Fees": 0.636828
}, {
    "Block": 14067755,
    "Gas Used": 2209050794,
    "Base Fee": 133,
    "Burnt Fees": 3.046534
}, {
    "Block": 14067756,
    "Gas Used": 3000540063,
    "Base Fee": 141.68,
    "Burnt Fees": 4.258257
}, {
    "Block": 14067757,
    "Gas Used": 906340323,
    "Base Fee": 159.38,
    "Burnt Fees": 1.535575
}, {
    "Block": 14067758,
    "Gas Used": 2600830635,
    "Base Fee": 152.21,
    "Burnt Fees": 3.970436
}, {
    "Block": 14067759,
    "Gas Used": 1306230459,
    "Base Fee": 166.14,
    "Burnt Fees": 2.26346
}, {
    "Block": 14067760,
    "Gas Used": 308450063,
    "Base Fee": 164.14,
    "Burnt Fees": 0.631141
}, {
    "Block": 14067761,
    "Gas Used": 204900975,
    "Base Fee": 148.86,
    "Burnt Fees": 0.370815
}, {
    "Block": 14067762,
    "Gas Used": 2801200891,
    "Base Fee": 133.33,
    "Burnt Fees": 3.749446
}, {
    "Block": 14067763,
    "Gas Used": 1503040469,
    "Base Fee": 147.78,
    "Burnt Fees": 2.261763
}, {
    "Block": 14067764,
    "Gas Used": 2800570874,
    "Base Fee": 148.1,
    "Burnt Fees": 4.155398
}];

(async () => {
    try {
        const cardSVG = await generateCardSVG(data, {
            yVars: ["Burnt Fees", "Gas Used"],
            yLabels: ["5.0 (ETH)", "68%"],
            // graph colors: order is back layer to front layer
            colors: ["#8cc500", "#1b8366"],
            cardWidth: 290,
            cardHeight: 500,
            // colors for the gradient
            startColor: "#8cc500",
            endColor: "#1b8366",
            // block elements
            fromBlock: "0x69a5cb5ea6928202073e371d90d0f7b723ec29d1",
            toBlock: "0x913efae547bc70e0dfb7aad615592952e92da0fe",
            fromBlockFontColor: "#000",
            toBlockFontColor: "#fff",

            // var label color
            varColor: "#ffffff",

            // text elements
            title: "DAY 128, 2022",
            subtitle: "6,700",
            subtitle_unit: "ETH",
            subtitle2: "BURNT",
            footer_text1: "October 24, 2022 | Base fee 44GWEI",
            footer_text2: "October 24, 2022 | Base fee 44GWEI",
            footer_text3: "October 24, 2022 | Base fee 44GWEI",
            footer_text4: "GAS USED (GWEI): 300.5",

            // font .ttf or .otf file - used to draw yVar labels
            // should be hosted on a web server and not relative path
            fontTTFURL: "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/fonts/roboto/Roboto-Thin.ttf"
        });
    } catch (e) {
        console.log("Error: ", e.message);
    }
})();