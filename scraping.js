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
      if(i<70){
        scarp()

    }

};

scarp()

