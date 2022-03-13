const { getItems, saveItem } = require('./item.controller');

getWeekItems()

//query
async function getWeekItems(){
console.log('hhh');
  let items = await getItems();
  console.log('all the itemssssssss', items);
   makeWeekItem(items)
};

//create
function makeWeekItem(gData){
    const weekItem = {
        // date: new Date(gData[0].date.slice(0,10)),
        startDate: gData[0].date,
        endDate: gData[gData.length-1].date,
        startBlock: gData[0].block,
        endBlock: gData[gData.length-1].block,
        totalBurnt: gData.reduce(
          (acc, curr) => acc + curr.burntFees, 0
        ),
    //     totalreward: gData.reduce(
    //       (acc, curr) => acc + curr.reward, 0
    //     ),
    //     totalTxn: gData.reduce(
    //       (acc, curr) => acc + curr.txn, 0
    //     ),
        daysData: gData,
      };
    
    // const weekItem = {
    //     test: 'testy',
    //     gData
    // }
    saveItem(weekItem);
};

module.exports = {
    getWeekItems,
}