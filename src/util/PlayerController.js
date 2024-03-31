import { Action } from "./Input";
import { rotate } from "./Tetrominoes";
import { hasCollision, isWithinBoard } from "./Board";

const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  } else {
    return false;
  }
};

export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

const attemptMovement = ({ board, action, player, setPlayer, setGameOver }) => {
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    // will move tetromino down to collision
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    // will move tetromino down one row
    delta.row += 1;
  } else if (action === Action.Left) {
    // will move tetromino left one row
    delta.column -= 1;
  } else if (action === Action.Right) {
    // will move tetromino right one row
    delta.column += 1;
  }

  // get back wherever weve collided and what the next position should be
  const { collided, nextPosition } = movePlayer({
    delta, // how much were trying to move
    position: player.position, // our current player position
    shape: player.tetromino.shape, // have to pass shape or curretn tetromino
    board, // give board to compare and see if move is allowable
  });
  console.log("COLLIDED STATE", collided);
  console.log("CURRENT PLAYER POSITION", player.position);
  // Did we collide immediately? If so, game over, man!
  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    // send to game over page, set game over there
    setGameOver(isGameOver);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver });
  }
};
