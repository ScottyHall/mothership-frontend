import React from 'react';
import D20 from './d20';

function InitialRollResults({ players }) {
  // Find the maximum initial roll value and the corresponding player index
  const maxInitialRoll = Math.max(...players.map(player => player.initialRoll));
  const maxIndex = players.findIndex(player => player.initialRoll === maxInitialRoll);

  return (
    <div>
      <h1>Initial Rolls</h1>
      <div className='flex justify-center items-center space-x-4'>
        {players.map((player, index) => (
          <div key={index}>
            {/* Apply green color to the player's name if their initial roll value is the maximum */}
            <p style={{ textAlign: 'center', color: player.initialRoll === maxInitialRoll ? 'green' : 'inherit' }}>{index === maxIndex ? '👑' : ''}{player.playerName} </p>
            <D20 joinResponse={player.initialRoll} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InitialRollResults;
