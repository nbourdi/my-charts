const express = require("express");
const router = express.Router();
const { producer } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");
var fileupload = require("express-fileupload");

router.get('/', async (req, res) => {
    try {
      const message = {
        key: 'nat',
        value: JSON.stringify({
          name: 'Alice',
          age: 30,
          city: 'New York'
        })
      };
      await producer.send({
        topic: 'chart_1',
        messages: [ message ]
      });
      console.log('api get request was made... message should be produced');
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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