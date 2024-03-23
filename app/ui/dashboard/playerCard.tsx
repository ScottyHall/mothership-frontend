import { useEffect, useState } from 'react';
import { dmMono } from '@/app/ui/fonts';

export default function PlayerCard({ playerName, playerHealth, playerTimer, commanderDmg, current, paused }) {
  const [timeLeft, setTimeLeft] = useState(Math.floor(playerTimer / 1000)); // Convert milliseconds to seconds and ignore fractions
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

  // Update the timer whenever the playerTimer prop changes
  useEffect(() => {
    setTimeLeft(Math.floor(playerTimer / 1000)); // Update timeLeft when playerTimer changes
  }, [playerTimer]);

  // Update the timer every second if the current player and not paused
  useEffect(() => {
    if (current && !paused && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Decrement the timeLeft state by 1 every second
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts or when the time runs out
      return () => clearInterval(timer);
    }
  }, [current, paused, timeLeft]); // Include current, paused, and timeLeft in the dependency array

  // Calculate minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format minutes and seconds to display with leading zeros if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Define the background color class based on the value of current and paused
  let backgroundColorClass = current ? 'bg-purple-200' : 'bg-purple-50';
  if (current && paused) {
    backgroundColorClass = 'bg-red-200';
  }

  return (
    <div className={`${dmMono.className} rounded-xl ${backgroundColorClass} p-2 shadow-sm`}>
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{playerName}</h3>
      </div>
      <div className="player-card">
        <p>Health: {playerHealth}</p>
        <p>Time Left: {current ? `${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`}</p>
        {renderCommanderDmg()}
      </div>
    </div>
  );
}