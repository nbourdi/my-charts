const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'chart_1_consumer',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'group_1' });
const producer = kafka.producer();

const fs = require("fs");
const chartExporter = require("highcharts-export-server");

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chart_1', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key.toString();
      const value = JSON.parse(message.value.toString());
     // console.log(`Received message on topic ${topic}, partition ${partition}:`);
     // console.log(`Key: ${key}`);
     // console.log(`Category: ${value.title1}`);
     // console.log(`Value: ${value.title2}`);
      //for (let i = 0; i < value.data.length; i++) {
     //   console.log(`Data ${i}: ${value.data[i].category} - ${value.data[i].value}`);
     // }

     const email = value.email;

      const { spawn } = require('child_process');
      const pythonScriptPath = 'consumer.py';
      
      var pythonArgs = [value.title1, value.title2]
      for (let i = 0; i < value.data.length; i++) {
        pythonArgs.push(value.data[i].category);
        pythonArgs.push(value.data[i].value);
      }
      //const pythonArgs = [value.title1, value.title2, value.data];

      const pythonProcess = spawn('python3', [pythonScriptPath, pythonArgs]);

      pythonProcess.stdout.on('data', async (data) => {
        //console.log(`stdout: ${data}`);
        const message = {
          key: 'key',
          value: JSON.stringify({
            email: email,
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