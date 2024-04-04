import React from "react";
import "./Menu.css";
import TetrisImg from "../assets/Tetris.png";

const Menu = ({ start, setOptions }) => {
  return (
    <div className="MenuContainer">
      <div className="Header">
        <img
          src={TetrisImg}
          alt="Tetris"
          style={{
            alignSelf: "center",
            maxWidth: "850px",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="Menu">
        <button className="Button" onClick={start}>
          Start
        </button>
        <button
          className="Button"
          onClick={() => {
            setOptions(true);
          }}
        >
          Options
        </button>
      </div>
    </div>
  );
};

export default Menu;
