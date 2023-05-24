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
            email: email,
            title1: categories[0],
            title2: values[0],
            data: data
          })
        };
        await producer.send({
          topic: 'chart_4',
          messages: [message]
        });
        console.log('api get request was made... message should be produced');
         await consumer.subscribe({ topic: 'chart_created4', fromBeginning: true });

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