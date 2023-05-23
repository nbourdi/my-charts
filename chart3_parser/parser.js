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

    let x = []
    let y = []
    let colors = []

    parse(csvData, { delimiter: "," })
      .on("data", function (row) {
        x.push(row[0]);
        y.push(row[1]);
        colors.push(row[2]);
      })
      .on("end", async function () {
        const data = [];
        for (let i = 1; i < y.length; i++) {
          data.push({
            y: y[i],
            x: x[i],
            color: colors[i]
          });
        }
        const message = {
          key: 'key',
          value: JSON.stringify({
            email: email,
            title1: y[0],
            title2: x[0],
            title3: colors[0],
            data: data
          })
        };
        console.log(message);
        await producer.send({
          topic: 'chart_3',
          messages: [message]
        });
        console.log('api get request was made... message should be produced');
        await consumer.subscribe({ topic: 'chart_created3', fromBeginning: true });

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