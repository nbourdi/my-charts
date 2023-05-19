const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'chart_5_consumer',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'chart5cons' });
const producer = kafka.producer();

const fs = require("fs");

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chart_5', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key.toString();
      const value = JSON.parse(message.value.toString());

      const { spawn } = require('child_process');
      const pythonScriptPath = 'consumer.py';
      var pythonArgs = [];
      pythonArgs.push(value[0].values.length);
      pythonArgs.push(value[0].category);
      pythonArgs.push(value[0].values);
      for (let i = 1; i < value.length; i++) {
        pythonArgs.push(value[i].category);
        pythonArgs.push(value[i].values);
      }

      const pythonProcess = spawn('python3', [pythonScriptPath, pythonArgs]);

      pythonProcess.stdout.on('data', async (data) => {
        console.log(`stdout: ${data}`);
        const message = {
          key: 'key',
          value: JSON.stringify({
            svg: data
          })
        };
        await producer.connect();
        await producer.send({
          topic: 'chart_to_database',
          messages: [ message ]
        });
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    }
  });
}

run().catch(console.error);

module.exports = { consumer };