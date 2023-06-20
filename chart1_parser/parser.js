const express = require("express");
const router = express.Router();
const { producer, consumer } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");

router.post('/', async (req, res) => {
  try {
    const csvData = req.files.my_csv.data;
    const email = req.body.email;

    console.log(csvData);

    let categories = [];
    let values = [];
    let errorFlag = false;

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
        categories.push(row[0]);
        values.push(row[1]);
      })
      .on("end", async function () {
        if (errorFlag) return; // Exit the route handler if there was an error

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
        console.log(message);
        await producer.send({
          topic: 'chart_1',
          messages: [message]
        });
        console.log('api get request was made... message should be produced');
        await consumer.subscribe({ topic: 'chart_created', fromBeginning: true });

        const messageHandler = async ({ message }) => {
          consumer.stop();
          if (!res.headersSent) {
            res.json({ status: 'success', message: message.value.toString() });
          }
        };

        await consumer.run({ eachMessage: messageHandler });
      })
      .on("error", function (error) {
        if (!res.headersSent) {
          res.status(500).json({ status: error.message });
        }
      });

  } catch (error) {
    console.error(error);
    res.status(400).json({ status: error.message });
  }
});



module.exports = router;