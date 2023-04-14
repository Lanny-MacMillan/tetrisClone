import "./Tetris.css";
import Board from "./Board";
import { useBoard } from "../../hooks/useBoard";

const Tetris = ({ rows, columns, setGameOver }) => {
  return (
    <div className="Tetris">
      <Board />
    </div>
  );
};

export default Tetris;
