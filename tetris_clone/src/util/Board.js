import { defaultCell } from "./Cell";

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
