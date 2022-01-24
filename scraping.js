//nodemon scraping.js => for printing in Terminal

const axios = require('axios'); 
const cheerio = require('cheerio');
const createCSV = require('csv-writer').createObjectCsvWriter;
// var fs = require('fs');
// var json2csv = require('json2csv');

// var newLine = '\r\n';
// var fields = ['block', 'date', 'txn', 'gasUsed', 'gasLimit', 'baseFee', 'reward', 'burntFees'];
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

for (let i = 1; i < 4; i++) {
    axios.get(`https://etherscan.io/blocks?ps=10&p=${i}`)
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
                // data[index] = { block };

                // var toCsv = {
                //     data: data,
                //     fields: fields,
                //     header: false,
                //   };
                //   fs.stat('file.csv', function (err, stat) {
                //     if (err == null) {
                //       console.log('File exists');
                  
                //       //write the actual data and end with newline
                //       var csv = json2csv(toCsv) + newLine;
                  
                //       fs.appendFile('file.csv', csv, function (err) {
                //         if (err) throw err;
                //         console.log('The "data to append" was appended to file!');
                //       });
                //     } else {
                //       //write the headers and newline
                //       console.log('New file, just writing headers');
                //       fields = fields + newLine;
                  
                //       fs.writeFile('file.csv', fields, function (err) {
                //         if (err) throw err;
                //         console.log('file saved');
                //       });
                //     }
                //   });
    
                csv.writeRecords(data)
                  .then(() => { console.log("Done!"); });
                  console.log(data);
                //   data = [];
            });

        
            // const jsonData = JSON.stringify(data);
            // console.log(jsonData);

        });


};

// exemples:
        // console.log(
        //             $('.className') // classname
        //                 // .children('a') //all the children that have <a> tag
        //                 .children()
        //                 .first()
        //                 // .last()
        //                 .text()
        //                 // .html()
        //                 // .attr('href')
        //     );
