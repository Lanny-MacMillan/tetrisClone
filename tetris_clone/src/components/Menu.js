import React from "react";
import "./Menu.css";

const Menu = ({ onClick }) => {
  return (
    <div className="MenuContainer">
      <div className="Header">Tetris</div>
      <div className="Menu">
        <button className="Button" onClick={onClick}>
          Play Tetris
        </button>
      </div>
    </div>
  );
};

export default Menu;
