import { useState } from 'react';
import { dmMono } from '@/app/ui/fonts';

export default function PlayerCard({ playerName, playerHealth, playerTimer, commanderDmg, current }) {
  const [health, setHealth] = useState(playerHealth);
  const [timer, setTimer] = useState(playerTimer);

  const renderCommanderDmg = () => {
    if (!commanderDmg || commanderDmg.length === 0) return null;

    return (
      <ul>
        {commanderDmg.map((dmg, index) => (
          <li key={index}>{`Commander Damage from ${dmg.uid}: ${dmg.health}`}</li>
        ))}
      </ul>
    );
  };

  // Define the background color class based on the value of paused
  const backgroundColorClass = current ? 'bg-purple-200' : 'bg-purple-50';

  return (
    <div className={`${dmMono.className} rounded-xl ${backgroundColorClass} p-2 shadow-sm`}>
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{playerName}</h3>
      </div>
      <div className="player-card">
      <p>Health: {health}</p>
      <p>Time Left: {timer}</p>
      {renderCommanderDmg()}
    </div>
    </div>
  );
}
