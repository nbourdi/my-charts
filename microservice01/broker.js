const path = require('path')
// require("dotenv").config({ path: path.resolve(__dirname, './.env') });
// const { Kafka } = require ('kafkajs'); // Kafka instance
const kafka = require('kafka-node')


const client = new kafka.KafkaClient({kafkaHost: process.env.KKAFKA_BOOTSTRAP_SERVERS})
const producer = new kafka.Producer(client)

// const clientId = "producer"; // it lets kafka know who produced the messages

// // INITIALIZE A BROKER
// const kafka = new Kafka({
// 	clientId: "producer",
// 	brokers: ["kafka:9092"],  // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
//  })

module.exports = { client, producer };