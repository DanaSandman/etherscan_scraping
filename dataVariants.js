const { getItems, saveItem } = require('./item.controller');

let gStartDays = 0
let gEndDays = 7
let gData = [];


//query
async function getWeekItems(){
  console.log(' data variants start');
  gData = await getItems();
  let items = gData.slice(gStartDays, gEndDays);
  console.log('after slicee');
  console.log('items.length',items.length);
  makeWeekItem(items)
};

//create
async function makeWeekItem(items){
    console.log('items[0].startDate',items[0].startDate);
    console.log('items[7].endDate',items[items.length -1].endDate);

    const weekItem = {
        variant: "week",
        startDate: items[0].startDate,
        endDate: items[items.length -1].endDate,
        startBlock: items[0].startBlock,
        endBlock: items[items.length -1].endBlock,
        totalBurnt: items.reduce(
          (acc, curr) => acc + curr.totalBurnt, 0
        ),
        totalreward: items.reduce(
          (acc, curr) => acc + curr.totalreward, 0
        ),
        totalTxn: items.reduce(
          (acc, curr) => acc + curr.totalTxn, 0
        ),
        daysData: items,
      };
      //add new week to DB
      await saveItem(weekItem,'week');
      console.log('new week added');

      gStartDays = gEndDays 
      gEndDays = gEndDays + 7

      console.log('gStartDays',gStartDays);
      console.log('gEndDays',gEndDays);
      console.log('gData.length', gData.length);

      if(gEndDays <= gData.length){
        getWeekItems()
      }else{
        console.log('The End');
      }
  };
  // getWeekItems()

module.exports = {
    getWeekItems,
}

