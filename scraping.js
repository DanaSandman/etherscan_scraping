//nodemon scraping.js => for printing in Terminal
const axios = require('axios'); 
const cheerio = require('cheerio');
const createCSV = require('csv-writer').createObjectCsvWriter;

const csv = createCSV({
    path: "demoD.csv",
    append: true,
    header: [
      {id: "block", title: "block"},
      {id: "date", title: "date"},
      {id: "txn", title: "txn"},
      {id: "gasUsed", title: "gasUsed"},
      {id: "gasLimit", title: "gasLimit"},
      {id: "baseFee", title: "baseFee"},
      {id: "reward", title: "reward"},
      {id: "burntFees", title: "burntFees"},
    ],
  });

 for (let i = 1; i < 11; i++) {
    axios.get(`https://etherscan.io/blocks?ps=100&p=${i}`)
        .then( res => {

            let data = [];
            const $ = cheerio.load(res.data);

            $('tr').each((index, element) => {
                //block
                const block = $(element)
                .children('td:nth-child(1)')
                .text()
                // console.log(block);

                //date
                const date = $(element)
                .children('.showDate')
                .text()
                // console.log(date);

                //txn
                const txn = $(element)
                .children('td:nth-child(4)')
                .text()
                // console.log(txn);

                //gasUsed
                const gasUsed = $(element)
                .children('td:nth-child(7)')
                .text()
                // console.log(gasUsed);

                //gasLimit
                const gasLimit = $(element)
                .children('td:nth-child(8)')
                .text()
                // console.log(gasLimit);

                //baseFee
                const baseFee = $(element)
                .children('td:nth-child(9)')
                .text()
                // console.log(baseFee);

                //reward
                const reward = $(element)
                .children('td:nth-child(10)')
                .text()
                // console.log(reward);

                //burnt fees 
                const burntFees = $(element)
                .children('td:nth-child(11)')
                .text()
                // console.log(burntFees);   

                data[index] = { block, date, txn, gasUsed, gasLimit, baseFee, reward, burntFees };
    
        });
        updateCsv()
        async function updateCsv(){
            await csv.writeRecords(data)
              .then(() => { console.log("Done!"); });
              console.log(data);
    }}); 
};
