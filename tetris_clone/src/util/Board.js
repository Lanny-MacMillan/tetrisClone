import { defaultCell } from "./Cell";
import { transferToBoard } from "./Tetrominoes";

export const buildBoard = ({ rows, columns }) => {
  // Take the rows and columns, make an array for the rows, for each row we make an array for the columns and than in each column we set up a default cell eventually return a board with rows and size with rows and columns
  const builtRows = Array.from({ length: rows }, () =>
    // default cell represents the default cell on the board
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );
  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
  const { tetromino, position } = player;

  // Copy and clear spaces used by pieces that
  // hadn't collided and occupied spaces permanently
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: tetromino.shape,
  });

  // Return the next board
  return {
    rows,
    size: { ...board.size },
  };
};
