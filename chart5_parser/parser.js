const express = require("express");
const router = express.Router();
const { producer } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");
var fileupload = require("express-fileupload");

router.get('/', async (req, res) => {
    try {
     let x = []
     let y = []

     fs.createReadStream("./chart5_csvs/stackplot.csv")
         .pipe(parse({ delimiter: "," }))
         .on('data', function (row) {
          Object.keys(row).forEach((key, index) => {
            if (index === 0) {
              x.push(row[key]);
            } else {
              if (!y[index - 1]) {
                y[index - 1] = [];
              }
              y[index - 1].push(row[key]);
            }
          });
         })
         .on('end', async function () {
            const data = [];
            for (let i = 0; i < x.length; i++) {
              const values = y.map((col) => col[i]);
              data.push({
                category: x[i],
                values: values
              });
            }
            console.log(data);
            const message = {
              key: 'key',
              value: JSON.stringify(data)
            };
            await producer.send({
              topic: 'chart_5',
              messages: [ message ]
            });
            console.log('api get request was made... message should be produced');
             res.status(200).json({status:"success"});
         })
         .on("error", function (error) {
             res.status(400).json({status: error.message});
         });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

module.exports = router;