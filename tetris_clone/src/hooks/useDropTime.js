import { useState, useCallback, useEffect } from "react";

const defaultDropTime = 1000; // 1000ms drop time on lv 1
const minimumDropTime = 100; // 100ms minimum drop time, gives player a chance to react later
const speedIncrement = 50; // 50ms increment per level

export const useDropTime = ({ gameStats }) => {
  const [dropTime, setDropTime] = useState(defaultDropTime);
  const [previousDropTime, setPreviousDropTime] = useState();

  const resumeDropTime = useCallback(() => {
    if (!previousDropTime) {
      // if no previous droptime return
      return;
    }
    setDropTime(previousDropTime); // when we resume we take the previous drop time
    setPreviousDropTime(null); // clear out previous drop time
  }, [previousDropTime]);

  const pauseDropTime = useCallback(() => {
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]); // dependency array will fire function if any keys change

  useEffect(() => {
    const speed = speedIncrement * (gameStats.level - 1); // update speed but not on the first level, thats why -1. every level beyond that we add speed incement
    const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime); // start with intial dropime and subtract current speed ( lv1 starts with 1 second per drop, each level subtracts 50ms per drop. Will not go lower than 100ms )

    setDropTime(newDropTime); // set drop time with new drop time
  }, [gameStats.level, setDropTime]); // if either change we want to call function

  return [dropTime, pauseDropTime, resumeDropTime];
};
