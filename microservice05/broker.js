const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'chart_from_database_consumer',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'group_1' });

async function start() {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic: 'chart_from_database', fromBeginning: true });
      console.log('Get charts connected to Kafka broker');
    } catch (error) {
      console.error('Get charts failed to connect to Kafka broker or subscribe to topic', error);
    }
}

start();

module.exports = { consumer };