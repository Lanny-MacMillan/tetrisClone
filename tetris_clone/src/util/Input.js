export const Action = {
  Left: "Left",
  FastDrop: "FastDrop",
  Pause: "Pause",
  Quit: "Quit",
  Right: "Right",
  Rotate: "Rotate",
  SlowDrop: "SlowDrop",
};

export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
};

export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);
// given an action is it slow drop or fast drop

export const actionForKey = (keyCode) => Key[keyCode];
