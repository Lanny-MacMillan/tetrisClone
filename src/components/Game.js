import React from "react";
import { useState } from "react";
import Menu from "./Menu";
import Options from "./Options";
import { useGameOver } from "../hooks/useGameOver";
import Tetris from "./Tetris/Tetris";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const [options, setOptions] = useState(false);

  const start = () => {
    resetGameOver();
  };

  const renderOptions = options && <Options setOptions={setOptions} />;

  const renderMenu = gameOver && !options && (
    <Menu start={start} setOptions={setOptions} />
  );

  const renderTetris = !gameOver && (
    <Tetris setGameOver={setGameOver} rows={rows} columns={columns} />
  );

  return (
    <div className="Game">
      {renderMenu}
      {renderOptions}
      {renderTetris}
    </div>
  );
};

export default Game;
