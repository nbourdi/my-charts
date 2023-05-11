const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'chart_1_consumer',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'group_1' });

const fs = require("fs");
const chartExporter = require("highcharts-export-server");

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chart_1', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key.toString();
      const value = JSON.parse(message.value.toString());
      console.log(`Received message on topic ${topic}, partition ${partition}:`);
      console.log(`Key: ${key}`);
      console.log(`Category: ${value.title1}`);
      console.log(`Value: ${value.title2}`);
      for (let i = 0; i < value.data.length; i++) {
        console.log(`Data ${i}: ${value.data[i].category} - ${value.data[i].value}`);
      }

      chartExporter.initPool();
      const chartDetails = {
        type: "png",
        options: {
            chart: {
                type: "pie"
            },
            title: {
                text: "Heading of Chart"
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.y}"
                    }
                }
            },
            series: [
                {
                    data: [
                        {
                            name: "a",
                            y: 100
                        },
                        {
                            name: "b",
                            y: 20
                        },
                        {
                            name: "c",
                            y: 50
                        }
                    ]
                }
            ]
        }
     };
     chartExporter.export(chartDetails, (err, res) => {
      // Get the image data (base64)
      let imageb64 = res.data;
      // Filename of the output
      let outputFile = "bar.png";
      // Save the image to file
      fs.writeFileSync(outputFile, imageb64, "base64", function(err) {
          if (err) console.log(err);
      });
      console.log("Saved image!");
      chartExporter.killPool();
      });     
      /*const { spawn } = require('child_process');
      const pythonScriptPath = 'consumer.py';
      const pythonArgs = [value.title1, value.title2, value.data];

      const pythonProcess = spawn('python', [pythonScriptPath, ...pythonArgs]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });*/
    }
  });
}

run().catch(console.error);

module.exports = { consumer };