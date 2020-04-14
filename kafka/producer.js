const kafka = require('kafka-node');
const config = require('../config/app.config');

class KafkaProducer {
    constructor () {
        this.client = new kafka.KafkaClient({kafkaHost: config.kafkaHost});
        this.producer = new kafka.Producer(this.client);
    }

    init () {
        this.producer.on("ready", () => {
            console.log('Kafka is running successfully!');
        });
        this.producer.on("error", (err) => {
            console.log(err);
        });
    };

    sendMessage(payloads, callback) {
        this.producer.send(payloads, callback);
    };
};

module.exports = KafkaProducer;