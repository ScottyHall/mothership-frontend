// utils/mqttClient.js
import mqtt from 'mqtt';

const mqttClient = mqtt.connect('ws://localhost:9001');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

export const subscribeToTopic = (topic, callback) => {
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic:', topic);
    }
  });

  mqttClient.on('message', (receivedTopic, message) => {
    if (receivedTopic === topic) {
      callback(message.toString());
    }
  });

  return () => {
    mqttClient.unsubscribe(topic);
  };
};

export default mqttClient;
