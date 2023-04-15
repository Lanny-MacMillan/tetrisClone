import React from "react";
import "./GameController.css";

import { playerController } from "../../util/PlayerController";
import { Action, actionForKey, actionIsDrop } from "../../util/Input";

import { useDropTime } from "../../hooks/useDropTime";
import { useInterval } from "../../hooks/useInterval";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      // pause === "P" will resume on input
      if (dropTime) {
        // means were dropping in play
        pauseDropTime(); // if were dropping - pause
      } else {
        // if were not dropping it means wer are in pause
        resumeDropTime(); // if !dropping - resume
      }
    } else if (action === Action.Quit) {
      // pause === "Q"
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime(); // if were dropping we want to pause the drop time
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
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
