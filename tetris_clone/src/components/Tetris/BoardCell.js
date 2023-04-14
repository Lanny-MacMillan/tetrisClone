import React from "react";
import "./BoardCell.css";

const BoardCell = ({ cell }) => (
  // change value to visually differentiate the tetromino
  <div className={`BoardCell ${cell.className}`}>
    <div className="Sparkle"></div>
  </div>
);

export default BoardCell;
