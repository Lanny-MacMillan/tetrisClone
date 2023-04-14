import React from "react";
import Menu from "./Menu";
import { useGameOver } from "../hooks/useGameOver";
import Tetris from "./Tetris/Tetris";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => {
    resetGameOver();
  };

  return (
    <div className="Game">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris setGameOver={setGameOver} rows={rows} columns={columns} />
      )}
    </div>
  );
};

export default Game;
