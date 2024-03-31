import React from "react";
import Menu from "./Menu";
import { useGameOver } from "../hooks/useGameOver";
import Tetris from "./Tetris/Tetris";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => {
    resetGameOver();
  };
  const options = () => {
    alert("Youve clicked options");
  };
  console.log("GAMEOVER STATE", gameOver);
  return (
    <div className="Game">
      {gameOver ? (
        // 1) send to game over page
        // 2) game over page will redirect to Game.js
        <Menu start={start} options={options} />
      ) : (
        <Tetris setGameOver={setGameOver} rows={rows} columns={columns} />
      )}
    </div>
  );
};

export default Game;
