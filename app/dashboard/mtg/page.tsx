'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import mqttClient from '@/app/lib/mqttClient';
import PlayerCard from '@/app/ui/dashboard/playerCard';
import MtgControls from '@/app/ui/mtg/mtgControls';
import InitialRollResults from '@/app/ui/mtg/initialRollResults';

export default function GameStatusPage() {
  const [gameStatus, setGameStatus] = useState(null);

  useEffect(() => {
    console.log('Component mounted');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('api/game/mtg/p/update');
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'api/game/mtg/p/update') {
        setGameStatus(JSON.parse(message.toString()));
      }
    });

    // Fetch initial game status
    fetchGameStatus();

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const fetchGameStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/game/mtg/gameStatus');
      setGameStatus(response.data);
    } catch (error) {
      console.error('Error fetching game status:', error);
    }
  };

  return (
    <div>
      {/* Conditionally render the InitialRollResults component if there are no active players */}
      {gameStatus?.players.length === 0 && <InitialRollResults players={gameStatus.lobby} />}
      <h1>Game Controls</h1>
      <MtgControls gameStatus={gameStatus} />
      <h1>Game Status</h1>
      {gameStatus ? (
        <div>
          {/* Render the current player card if currentPlayer exists */}
          {gameStatus.currentPlayer && (
            <PlayerCard
              playerName={gameStatus.currentPlayer.playerName}
              playerHealth={gameStatus.currentPlayer.playerHealth}
              playerTimer={gameStatus.currentPlayer.playerTimer.timeLeft}
              commanderDmg={gameStatus.currentPlayer.commanderDmg}
              current={true}
              paused={gameStatus.currentPlayer.playerTimer.paused}
            />
          )}
          {/* Render player cards for each player in the game except currentPlayer */}
          {gameStatus.currentPlayer && gameStatus.players.map((player, index) => (
            // Check if player is not the currentPlayer
            player.playerUid !== gameStatus.currentPlayer.playerUid && (
              <PlayerCard
                key={index}
                playerName={player.playerName}
                playerHealth={player.playerHealth}
                playerTimer={player.playerTimer.timeLeft}
                commanderDmg={player.commanderDmg}
                current={false}
                paused={player.playerTimer.paused}
              />
            )
          ))}
          {/* Render player cards for each player in the lobby */}
          <h2>Lobby</h2>
          {gameStatus.lobby.map((player, index) => (
            <PlayerCard
              key={index}
              playerName={player.playerName}
              playerHealth={player.playerHealth}
              playerTimer={player.playerTimer.timeLeft}
              commanderDmg={player.commanderDmg}
              current={false}
              paused={player.playerTimer.paused}
            />
          ))}
        </div>
      ) : (
        <p>Loading game status...</p>
      )}
    </div>
  );
}
