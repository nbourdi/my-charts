const express = require("express");
const router = express.Router();
const { producer, consumer } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");
var fileupload = require("express-fileupload");

router.post('/', async (req, res) => {
  try {

    const csvData = req.files.my_csv.data;
    const email = req.body.email;

    console.log(csvData);

    let categories = []
    let values = []

    index = 0;
    errorFlag = false;

    parse(csvData, { delimiter: "," })
      .on("data", function (row) {
        if (row.length !== 2) {
          errorFlag = true;
          console.log("no 2 columns");
          if (!res.headersSent) {
            res.status(400).json({ message: "invalid file format" });
          }
          return;
        }
        else if ((!(/^-?\d+(\.\d+)?$/.test(row[0].trim()) || /^-?\.\d+$/.test(row[0].trim())) || !(/^-?\d+(\.\d+)?$/.test(row[1].trim()) || /^-?\.\d+$/.test(row[1].trim()))) && index != 0){
          errorFlag = true;
          console.log("not integer");
          if (!res.headersSent) {
            res.status(400).json({ message: "invalid file format" });
          }
          return;
        }
        categories.push(row[0]);
        values.push(row[1]);
        index += 1;
      })
      .on("end", async function () {
        if (errorFlag) return;

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
            email: email,
            title1: categories[0],
            title2: values[0],
            data: data
          })
        };
        await producer.send({
          topic: 'chart_6',
          messages: [message]
        });
        console.log('api get request was made... message should be produced');
        await consumer.subscribe({ topic: 'chart_created6', fromBeginning: true });

        const messageHandler = async ({ message }) => {
          consumer.stop();
          res.json({ status: 'success', message: message.value.toString() });
        };

        await consumer.run({ eachMessage: messageHandler });
      })
      .on("error", function (error) {
        res.status(400).json({ status: error.message });
      });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;