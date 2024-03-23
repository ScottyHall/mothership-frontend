import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MtgControls({ gameStatus }) {

  const handleStartGame = async () => {
    try {
      await axios.post('http://localhost:8081/api/game/mtg/start');
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handlePauseTurn = async () => {
    try {
      await axios.post('http://localhost:8081/api/game/mtg/pausePlayCurrentPlayer');
    } catch (error) {
      console.error('Error pausing turn:', error);
    }
  };

  const handleClearGame = async () => {
    try {
      await axios.post('http://localhost:8081/api/game/mtg/clearGame');
    } catch (error) {
      console.error('Error clearing game:', error);
    }
  };

  const handleNextTurn = async () => {
    try {
      await axios.post('http://localhost:8081/api/game/mtg/nextTurn');
    } catch (error) {
      console.error('Error advancing to next turn:', error);
    }
  };

  const handleJoinGame = async () => {
    try {
      const storedUserId = localStorage.getItem('selectedUser');
      if (!storedUserId) {
        console.error('No user ID found in localStorage');
        return;
      }
      const response = await axios.post('http://localhost:8081/api/game/mtg/join', storedUserId);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const handleMeNext = async () => {
    try {
      const storedUserId = localStorage.getItem('selectedUser');
      if (!storedUserId) {
        console.error('No user ID found in localStorage');
        return;
      }
      await axios.post('http://localhost:8081/api/game/mtg/meNext', storedUserId);
    } catch (error) {
      console.error('Error indicating "Me Next":', error);
    }
  };

  return (
    <div>
      <h1>Magic: The Gathering Game</h1>
      {/* show at startingControls */}
      {/* Show "Join Game" button only if the user is not in the lobby */}
      {gameStatus && !gameStatus.players.some(player => player.playerUid === localStorage.getItem('selectedUser')) && !gameStatus.lobby.some(player => player.playerUid === localStorage.getItem('selectedUser')) && (
        <button className="flex items-center gap-5 self-start rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base"
         onClick={handleJoinGame}>Join Game</button>
      )}
      {/* Show "Start Game" button if no players in active and at least one in lobby */}
      {gameStatus && gameStatus.players.length === 0 && gameStatus.lobby.length > 0 && (
        <button className="flex items-center gap-5 self-start rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base"
         onClick={handleStartGame}>Start Game</button>
      )}
      {gameStatus && !gameStatus.players.some(player => player.playerUid === localStorage.getItem('selectedUser')) && gameStatus.lobby?.some(player => player.playerUid === localStorage.getItem('selectedUser')) && (
        <button className="flex items-center gap-5 self-start rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base"
         onClick={handleMeNext}>Me Next</button>
      )}
      {/* show during own turn */}
      {gameStatus && gameStatus.currentPlayer?.playerUid === localStorage.getItem('selectedUser') && (
      <button className="flex items-center gap-5 self-start rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base"
       onClick={handleNextTurn}>Pass</button>
      )}
      {/* show at all times */}
      <button className="flex items-center gap-5 self-start rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base"
       onClick={handlePauseTurn}>Pause Turn</button>

      {/* debugging buttons */}
      <button className="flex items-center gap-5 self-start rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400 md:text-base"
       onClick={handleClearGame}>Clear Game</button>

      {/* Display game status */}
      {/* {gameStatus && (
        <div>
          <h2>Game Status</h2>
          <pre>{JSON.stringify(gameStatus, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default MtgControls;
