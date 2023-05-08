const path = require('path')
const kafka = require('kafka-node')


const client = new kafka.KafkaClient({kafkaHost: process.env.KKAFKA_BOOTSTRAP_SERVERS})
const consumer = new kafka.Consumer(client, [{ topic: process.env.KAFKA_TOPIC }],
    { 
        autocommit: false
    })

consumer.on('message', async (message) => {  /// edw mesa antidra
    console.log('i got data chart produce')
})

module.exports = { client, consumer };