const { consumer }  = require("./broker");
const express = require("express");
const router = express.Router();
const { charts } = require('./chartsModel');
var mongoose = require('mongoose');


async function read_user_from_kafka() {

    var user;

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const key = message.key.toString();
            const value = JSON.parse(message.value.toString());

            console.log(`Received message on topic ${topic}, partition ${partition}:`);
            console.log(`Key: ${key}`);

            console.log(`User: ${value.email}`);
            user_email = value.email;

            user = { 'user_email': user_email };

            var users_charts = await charts.find({ user_email: user.user_email }).then(function () {
                console.log("Got users charts.");
                res.status(200).json(users_charts);
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
            console.log("Connected and ready to get charts!");
        })

        read_user_from_kafka().catch(console.error);

        charts_db.close();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;