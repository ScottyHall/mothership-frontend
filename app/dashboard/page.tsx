'use client';
import { useEffect, useState } from 'react';
import mqttClient, { subscribeToTopic } from '../lib/mqttClient';

export default function Page() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Component mounted');
    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('my-topic');
    });

    return () => {
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    const unsubscribe = subscribeToTopic('api/game/mtg/p/update', (msg) => {
      setMessage(msg);
      console.log(JSON.parse(msg));
    });

    return unsubscribe;
  }, []);

  return <p>Dashboard Page</p>;
}