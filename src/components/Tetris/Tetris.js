import "./Tetris.css";
import Board from "./Board";
import GameStats from "./GameStats";
import Previews from "./Previews";
import GameController from "./GameController";
import { useBoard } from "../../hooks/useBoard";
import { useGameStats } from "../../hooks/useGameStats";
import { usePlayer } from "../../hooks/usePlayer";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });

  return (
    <div className="Tetris">
      <div className="TetrisBoard">
        <Board board={board} />
      </div>
      <div className="TetrisInfo">
        <div className="TetrisPreviews">
          <Previews tetrominoes={player.tetrominoes} />
        </div>
        <div className="TetrisGameStats">
          <GameStats gameStats={gameStats} />
        </div>
      </div>
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
};

export default Tetris;
