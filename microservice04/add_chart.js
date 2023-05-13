const { consumer } = require("./broker");
const express = require("express");
const router = express.Router();
const { charts } = require('./chartsModel');
var mongoose = require('mongoose');


async function read_chart_from_kafka() {

    var chart;

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const key = message.key.toString();
            const value = JSON.parse(message.value.toString());

            console.log(`Received message on topic ${topic}, partition ${partition}:`);
            console.log(`Key: ${key}`);

            console.log(`Category: ${value.type}`);
            type = value.type;

            console.log(`SVG_string: ${value.svg_string}`);
            svg_string = value.svg_string;

            console.log(`User: ${value.email}`);
            user_email = value.email;

            curr_date = Date.now();

            chart = { 'user_email': user_email, 'type': type, 'date': curr_date, 'svg_string': svg_string };

            charts.insertOne(chart).then(function () {
                console.log("Chart inserted.");
                res.json({ success: "success" });
            }).catch(console.error);
        }
    });

}

router.get('/', async (req, res) => {
    try {

        //create connection to database
        mongoose.connect('mongodb://mongodb_charts:27017/charts', { useNewUrlParser: true });

        //connect to database
        var charts_db = mongoose.connection;

        charts_db.on('error', console.error.bind(console, "CONNECTION ERROR"));
        charts_db.once('open', function () {
            //we are connected
            console.log("Connected and ready to add chart!");
        })

        read_chart_from_kafka().catch(console.error);

        charts_db.close();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;