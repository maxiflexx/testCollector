const kafka = require('kafka-node');

class KafkaProducer {
    constructor() {
        this.client = new kafka.KafkaClient({ kafkaHost: "192.168.99.100:9092" });
        this.producer = new kafka.Producer(this.client);
    };

    init() {
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