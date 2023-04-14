import React from "react";
import "./GameController.css";
import { playerController } from "../../util/PlayerController";
import { Action, actionForKey } from "../../util/Input";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  // using code to get the key code for arrows keys and qww
  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    console.log("onKeyUpAction", action);
    if (action === Action.Quit) {
      setGameOver(true);
    }
  };
  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);
    console.log("onKeyDownAction", action);
    handleInput({ action });
  };

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;
