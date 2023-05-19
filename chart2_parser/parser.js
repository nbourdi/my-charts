const express = require("express");
const router = express.Router();
const { producer } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");
var fileupload = require("express-fileupload");

router.get('/', async (req, res) => {
    try {
     let categories = []
     let values = []

     fs.createReadStream("./chart2_csvs/simple_chart.csv")
         .pipe(parse({ delimiter: "," }))
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
            await producer.send({
              topic: 'chart_2',
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