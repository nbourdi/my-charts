const { consumer } = require("./broker");
const express = require("express");
const router = express.Router();
const { Charts } = require('./chartsModel');
var mongoose = require('mongoose');


router.get('/', async (req, res) => {
    try {

        const email = req.body.email;
        const svg = req.body.svg;
        const type = req.body.type;
        const title = req.body.title;

        const curr_date = Date.now();

        const chart = { 'user_email': email, 'type': type, 'chart_title': title, 'date': curr_date, 'svg_string': svg };

        //create connection to database
        mongoose.connect('mongodb://mongodb_charts:27017/charts', { useNewUrlParser: true });

        //connect to database
        var charts_db = mongoose.connection;

        charts_db.on('error', console.error.bind(console, "CONNECTION ERROR"));
        charts_db.once('open', async function () {
            //we are connected
            console.log("Connected and ready to add chart!");
            Charts.collection.insertOne(chart).then(function () {
                console.log("Chart inserted.");
            });
        });


    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;