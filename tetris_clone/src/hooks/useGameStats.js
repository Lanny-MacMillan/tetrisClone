import { useState, useCallback } from "react";

const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0,
});

export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());

  const addLinesCleared = useCallback((lines) => {
    // when lines are cleared setGameStats
    setGameStats((previous) => {
      const points = previous.points + lines * 100; // points consists of prvious.points, then 100 points for every line you get
      const { linesPerLevel } = previous; // get lines per level from previous game stats
      const newLinesCompleted = previous.linesCompleted + lines; // previous completed plus new lines completed
      const level =
        newLinesCompleted >= linesPerLevel
          ? previous.level + 1 // if lines completed is greater than lines per level, add 1 to level.
          : previous.level; // if lines completed is !greater than lines per level, keep current level
      const linesCompleted = newLinesCompleted % linesPerLevel; // we dont want it to increment indefinitely. always how many lines to next lewvel

      return {
        level,
        linesCompleted,
        linesPerLevel,
        points,
      };
    }, []);
  }, []);

  return [gameStats, addLinesCleared];
};
