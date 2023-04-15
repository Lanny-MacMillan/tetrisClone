import React from "react";

import "./GameStats.css";

const GameStats = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <ul className="GameStats">
      <li>Level</li>
      <li className="value">{level}</li>

      <li>Lines to level</li>
      <li className="value">{linesToLevel}</li>

      <li>Points</li>
      <li className="value">{points}</li>
    </ul>
  );
};
// Memoize the GameStats so it doesnt update with every render, works like a useEffects dependency array, will only render on GameStats change
export default React.memo(GameStats);
