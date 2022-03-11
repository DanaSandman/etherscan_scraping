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

let gLastDate = 0
  
let gData = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let i = 1

async function scarp(){
  
    console.log('start', i, 'date', gLastDate, 'length', gData.length);
    await sleep(3000);
    let res = await axios.get(`https://etherscan.io/blocks?ps=100&p=${i}`)
    const $ = cheerio.load(res.data);

    $('tr').each(async (index, element) => {
        //block
        const block = $(element)
        .children('td:nth-child(1)')
        .text()
        // console.log('block', block);

        //date
        const date = $(element)
        .children('.showDate')
        .text()
        // console.log('date', date);

        //txn
        let txn = $(element)
        .children('td:nth-child(4)')
        .text()
        txn = parseInt(txn);
        // console.log(txn);

        //gasUsed
        let gasUsed = $(element)
        .children('td:nth-child(7)')
        .text()
        gasUsed = parseInt(gasUsed.slice(0, gasUsed.search(' ')).replace(/,/g, ''));
        // console.log(gasUsed);

        //gasLimit
        const gasLimit = $(element)
        .children('td:nth-child(8)')
        .text()
        // console.log(gasLimit);

        //baseFee
        let baseFee = $(element)
        .children('td:nth-child(9)')
        .text()
        baseFee = parseFloat(baseFee.replace(' Gwei', ''));
        // console.log(baseFee);

        //reward
        let reward = $(element)
        .children('td:nth-child(10)')
        .text()
        reward = parseFloat(reward.replace(' Ether', ''));
        // console.log(reward);

        //burnt fees 
        let burntFees = $(element)
        .children('td:nth-child(11)')
        .text()
        burntFees = parseFloat(burntFees.slice(0, burntFees.search(' ')));
        // console.log(burntFees);   

        if(block > 0){
          let curDate = new Date(date).getDate();
          // console.log('curDate', curDate);
          // console.log('gLastDate', gLastDate);
          if(gLastDate === 0){
            gLastDate = curDate
          }
          else if(curDate < gLastDate){
              console.log('gLastDate', gLastDate);
              console.log('curDate', curDate);
              //End of day
              // Add to DB
              // await csv.writeRecords(gData)
              console.log('end of the day', gLastDate, 'updateCsv', gData.length);
              console.log('start block', gData[0].block)
              console.log('end block', gData[gData.length-1].block);
              gLastDate = curDate
              gData = []
          }

          gData.push({ block, date, txn, gasUsed, gasLimit, baseFee, reward, burntFees });
              }
              });

      i++ 
      //Pages number
      // if(i<70){
      if(i<2){
        scarp()
    }

};

scarp()

