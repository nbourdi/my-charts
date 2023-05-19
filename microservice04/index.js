const { Charts } = require('./chartsModel');
var mongoose = require('mongoose');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'chart_to_database_consumer',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'group_2' });


async function run() {

    //create connection to database
    await mongoose.connect('mongodb://mongodb_charts:27017/charts', { useNewUrlParser: true });

    //connect to database
    var charts_db = mongoose.connection;

    await consumer.connect();
    await consumer.subscribe({ topic: 'chart_to_database', fromBeginning: true });
    console.log('Add chart connected to Kafka broker');

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const key = message.key.toString();
            const value = JSON.parse(message.value.toString());

            console.log(`Received message on topic ${topic}, partition ${partition}:`);
            console.log(`Key: ${key}`);

            // console.log(`SVG_string: ${value.svg.data}`);
            const svg_string = value.svg.data.toString();

            const user_email = "me@me.com";

            const curr_date = Date.now();

            const chart = { 'user_email': user_email, 'date': curr_date, 'svg_string': svg_string };

            console.log("Going to insert in DB");

            Charts.collection.insertOne(chart).then(function () {
                console.log("Chart inserted.");
            });

        }
    });

}

run().catch(console.error);

module.exports = { consumer };
