const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'chart_1_consumer',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'group_1' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chart_1', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key.toString();
      const value = JSON.parse(message.value.toString());
      console.log(`Received message on topic ${topic}, partition ${partition}:`);
      console.log(`Key: ${key}`);
      console.log(`Value: ${value}`);
    }
  });
}

run().catch(console.error);

module.exports = { consumer };