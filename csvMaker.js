//nodemon csvMaker.js => for printing in Terminal
const createCSV = require('csv-writer').createObjectCsvWriter;
const { getItems } = require('./item.controller');

async function makeCsvFile(){

const csv = createCSV({
    path: "demoD.csv",
    append: true,
    header: [
      {id: "id", title: "id"},
      {id: "variant", title: "variant"},
      {id: "date", title: "date"},
      {id: "startDate", title: "startDate"},
      {id: "endDate", title: "endDate"},
      {id: "startBlock", title: "startBlock"},
      {id: "totalBurnt", title: "totalBurnt"},
      {id: "totalTxn", title: "totalTxn"},
      {id: "blockData", title: "blockData"},
    ],
  });

    let data = await getItems();
    
    data.map( item => 
      item.blocksData = 0
    )
    console.log('gData from DB',data);
    await csv.writeRecords(data);
}
console.log('csv maker page');
makeCsvFile();
