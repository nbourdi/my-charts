const express = require("express");
const router = express.Router();
const { kafka, clientId } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");
var fileupload = require("express-fileupload");

const producer = kafka.producer(); // NEW PRODUCER
//const consumer = kafka.consumer(); // NEW CONSUMER

const run = async (list) => {
    await producer.connect()
    
    while (true) {
        await producer.send({
            topic: "chart1_parser",
            messages: [
                { value: list }
            ]
        })
    }
}

router.get('/', function (req, res) {

    let categories = []
    let values = []

    fs.createReadStream("./chart1_csvs/bar_chart.csv")
        .pipe(parse({ delimiter: "," }))
        .on("data", function (row) {
            categories.push(row[0]);
            values.push(row[1]);    
        })
        .on("end", function () {
            res.status(200).json({status:"success"});
            console.log(categories);
            console.log(values);
            run(categories);
            run(values);
        })
        .on("error", function (error) {
            res.status(400).json({status: error.message});
        });

})

module.exports = router;