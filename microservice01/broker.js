const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, './.env') });
const { Kafka } = require ('kafkajs'); // Kafka instance

const clientId = process.env.KAFKA_CLIENT; // it lets kafka know who produced the messages

// INITIALIZE A BROKER
const kafka = new Kafka({
	clientId: "producer",
	brokers: ["192.168.64.13:9092"],  // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
 })

module.exports = { kafka, clientId };