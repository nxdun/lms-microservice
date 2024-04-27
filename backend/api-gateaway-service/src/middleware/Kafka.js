// kafkaService.js

const kafka = require('kafka-node');

class KafkaService {
  constructor() {
    this.kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
    this.producer = new kafka.Producer(this.kafkaClient);

    this.producer.on('ready', () => {
      console.log('Kafka producer is ready');
    });

    this.producer.on('error', (err) => {
      console.error('Error with Kafka producer:', err);
    });
  }

  sendEvent(req, res, next) {
    const message = {
      topic: 'events_topic',
      messages: `Event occurred at ${new Date().toISOString()} from ${req.originalUrl}`,
    };

    this.producer.send([message], (err, data) => {
      if (err) {
        console.error('Error sending message to Kafka:', err);
        next(err); // Pass error to the next middleware
      } else {
        console.log('Message sent to Kafka:', data);
        next(); // Proceed to the next middleware
      }
    });
  }
}

module.exports = new KafkaService();
