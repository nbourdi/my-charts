const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'chart1_producer',
    brokers: ['kafka:9092']
  });
  
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'ch_creat' });

async function start() {
    try {
      await producer.connect();
      console.log('Connected to Kafka broker');
    } catch (error) {
      console.error('Failed to connect to Kafka broker', error);
    }
}

start();

module.exports = { producer, consumer };