const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'chart_3_consumer',
  brokers: ['kafka:9092'],
});

//await consumer.clearMetadataCache();
const consumer = kafka.consumer({ groupId: 'chart3cons' });

const producer = kafka.producer();

const fs = require("fs");

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chart_3', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key.toString();
      const value = JSON.parse(message.value.toString());

      const email = value.email;

      const { spawn } = require('child_process');
      const pythonScriptPath = 'consumer.py';
      var pythonArgs = [value.title1, value.title2, value.title3]
      for (let i = 0; i < value.data.length; i++) {
        pythonArgs.push(value.data[i].y);
        pythonArgs.push(value.data[i].x);
        pythonArgs.push(value.data[i].color);
      }

      const pythonProcess = spawn('python3', [pythonScriptPath, pythonArgs]);

      pythonProcess.stdout.on('data', async (data) => {
        console.log(`stdout: ${data}`);
        const message = {
          key: 'key',
          value: JSON.stringify({
            email: email,
            svg: data
          })
        };
        console.log(message);
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