const express = require("express");
const router = express.Router();
const { producer, client } = require('./broker');
const fs = require("fs");
const { parse } = require("csv-parse");
var fileupload = require("express-fileupload");

const run = async (list) => {
    var i = 0
    producer.on('ready', () => {
        console.log('i sent stuff')
        producer.send([
            {
                topic: process.env.KAFKA_TOPIC, 
                messages: [
                    {   key: i.toString(),
                        value: 'hey' }
                ]
            }
        ])
    })
    
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