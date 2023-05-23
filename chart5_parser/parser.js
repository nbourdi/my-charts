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

    let x = []
    let y = []

    parse(csvData, { delimiter: "," })
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
          value: JSON.stringify({
            email: email,
            data: data
          })
        };
        await producer.send({
          topic: 'chart_5',
          messages: [message]
        });
        console.log('api get request was made... message should be produced');
        await consumer.subscribe({ topic: 'chart_created5', fromBeginning: true });

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