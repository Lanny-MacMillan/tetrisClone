import { defaultCell } from "./Cell";
import { transferToBoard } from "./Tetrominoes";
import { movePlayer } from "./PlayerController";

export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1; // total rows for board minus current position, then add 1
  let row = 0; // initial row 0

  for (let i = 0; i < max; i++) {
    // basically keep trying to place the piece and see if we geta  collision or not
    const delta = { row: i, column: 0 }; // delta is how many rows ahead we're looking
    const result = movePlayer({ delta, position, shape, board }); // move player and store result
    const { collided } = result; // checking for collision, pulled from result

    if (collided) {
      // if we collide stop to get out of loop
      break;
    }
    // if no collision keep looping
    row = position.row + i;
  }
  // return our position and override row
  return { ...position, row };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  // Copy and clear spaces used by pieces that
  // hadn't collided and occupied spaces permanently
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  // Drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape,
  });

  // Place ghost
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost" // assigns ghost classname when player is fastdropping
  }`;
  rows = transferToBoard({
    // transfer ghost to the board here
    className,
    isOccupied: player.isFastDropping, // if your fast dropping space will be condiered occupied for immediate collision
    position: dropPosition,
    rows,
    shape: tetromino.shape,
  });

  // Place the piece under normal drop.
  // If it collided, mark the board cells as collided
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape,
    });
  }

  // Check for cleared lines
  const blankRow = rows[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  rows = rows.reduce((acc, row) => {
    // reduce rows
    // accumulator will be empty array initially,
    if (row.every((column) => column.occupied)) {
      // and then for the row is every column occupied, if it is its a cleaered line, increase lines cleared by 1
      linesCleared++;
      acc.unshift([...blankRow]); // for cleared lines add blank row to the begining of our rows
    } else {
      acc.push(row); // push new row on to the end of the list
    }

    return acc; // return accumulator
  }, []);

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }

  // If we collided, reset the player!
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // Return the next board
  return {
    rows,
    size: { ...board.size },
  };
};

export const hasCollision = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    // go through each row

    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      // go through each column
      if (shape[y][x]) {
        // checks if there is a piece of tetromino at that position, checking for 1s in the Tetromino list
        const column = x + position.column;

        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isWithinBoard = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    // go through each row
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      // go through each column
      if (shape[y][x]) {
        // checks if there is a piece of tetromino at that position, checking for 1s in the Tetromino list, if true
        const column = x + position.column; // take column of piece and add our current position
        const isValidPosition = board.rows[row] && board.rows[row][column]; // is this a valod position
        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};
