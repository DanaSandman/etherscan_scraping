//nodemon scraping.js => for printing in Terminal
const axios = require('axios'); 
const cheerio = require('cheerio');
const createCSV = require('csv-writer').createObjectCsvWriter;
// import { from } from 'json2csv/JSON2CSVTransform';
const { saveItem } = require('./item.controller');

const { getWeekItems } = require('./dataVariants');

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
let i = 1

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scarp(){
    console.log('start', i, 'Last date', gLastDate, 'length', gData.length);
    await sleep(1500);

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
        // console.log('burntFees',burntFees);   

        if(block > 0){
          let curFullDate = new Date(date);
          let curDate = curFullDate.getDate();
          // console.log('curDate', curDate);
          // console.log('gLastDate', gLastDate);
          if(gLastDate === 0){
            gLastDate = curDate
          }
          else if(curDate < gLastDate){
            console.log('end of the day', gLastDate, 'length', gData.length);

              let item = {
                variant: "day",
                date: new Date(gData[0].date.slice(0,10)),
                startDate: gData[0].date,
                endDate: gData[gData.length-1].date,
                startBlock: gData[0].block,
                endBlock: gData[gData.length-1].block,
                totalBurnt: gData.reduce(
                  (acc, curr) => acc + curr.burntFees, 0
                ),
                totalreward: gData.reduce(
                  (acc, curr) => acc + curr.reward, 0
                ),
                totalTxn: gData.reduce(
                  (acc, curr) => acc + curr.txn, 0
                ),
                blocksData: gData,
              };


              // Add to DB
              addToDb(item)
              // await csv.writeRecords(gData)
              
              console.log('start block', item.blocksData[0]);
              console.log('end block', item.blocksData[item.blocksData.length-1]);
              console.log('date', item.date);
              console.log('totalBurnt', item.totalBurnt);
              
              gLastDate = curDate
              gData = []
          }
          const iSblockNum = gData.find(element => {
            if (element.block === block) {
              console.log('duble');
              return true;
            }else{
                return false
              }
            })
          if(!iSblockNum){
            gData.push({ block, date, txn, gasUsed, gasLimit, baseFee, reward, burntFees });
          }
              }
          });
      i++ 
      //Pages number
      if(i<1100){ //for week
    //   // if(i<2){
        scarp()
    }

};
scarp()

function addToDb(item){
  saveItem(item);
}
