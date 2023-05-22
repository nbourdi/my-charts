const express = require("express");
const router = express.Router();
const { producer } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");

router.post('/', async (req, res) => {
  try {

    const csvData = req.files.my_csv.data;
    

    console.log(csvData);

    let categories = []
    let values = []

    
      parse(csvData, { delimiter: "," })
      .on("data", function (row) {
        categories.push(row[0]);
        values.push(row[1]);
      })
      .on("end", async function () {
        const data = [];
        for (let i = 1; i < categories.length; i++) {
          data.push({
            category: categories[i],
            value: values[i]
          });
        }
        const message = {
          key: 'key',
          value: JSON.stringify({
            title1: categories[0],
            title2: values[0],
            data: data
          })
        };
        console.log(message);
        await producer.send({
          topic: 'chart_1',
          messages: [message]
        });
        console.log('api get request was made... message should be produced');
        res.status(200).json({ status: "success" });
      })
      .on("error", function (error) {
        res.status(500).json({ status: error.message });
      });

  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});
// router.get('/', function (req, res) {

// if(producer.ready){
//     // do some work
//     console.log('ready??????????')
//     producer.send(payloads, function (err, data) {
//         console.log(data);
//     });
// }
//     let categories = []
//     let values = []

//     fs.createReadStream("./chart1_csvs/bar_chart.csv")
//         .pipe(parse({ delimiter: "," }))
//         .on("data", function (row) {
//             categories.push(row[0]);
//             values.push(row[1]);    
//         })
//         .on("end", function () {
//             res.status(200).json({status:"success"});
//             console.log('18:42')
//             console.log(categories);
//             console.log(values);
//             run(categories);
//             run(values);
//         })
//         .on("error", function (error) {
//             res.status(400).json({status: error.message});
//         });

// })

module.exports = router;