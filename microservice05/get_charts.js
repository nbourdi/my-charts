const express = require("express");
const router = express.Router();
const { Charts } = require('./chartsModel');
var mongoose = require('mongoose');


router.get('/:email', async (req, res) => {
    try {

        const email = req.params.email;

        //create connection to database
        mongoose.connect('mongodb://mongodb_charts:27017/charts', { useNewUrlParser: true });

        //connect to database
        var charts_db = mongoose.connection;

        charts_db.on('error', console.error.bind(console, "CONNECTION ERROR"));
        charts_db.once('open', async function () {
            //we are connected
            console.log("Connected and ready to get charts!");
            const users_charts = await Charts.find({user_email: email}).then((charts) => {
                console.log("Got users charts.");
                res.send(charts);
            });
        });


    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;