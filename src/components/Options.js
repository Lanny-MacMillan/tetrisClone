import React from "react";

const Options = ({ setOptions }) => {
  return (
    <>
      <div className="OptionsContainer">
        <div className="OptionsHeader">
          <h1>Game Controls</h1>
        </div>
        <ul className="OptionsList">
          <li>
            <span>Arrow Up:</span> Rotate
          </li>
          <li>
            <span>Arrow Left:</span> Left
          </li>
          <li>
            <span>Arrow Right:</span> Right
          </li>
          <li>
            <span>Arrow Down:</span> SlowDrop
          </li>
          <li>
            <span>Space:</span> FastDrop
          </li>
          <br />
          <li>
            <span>Key Q:</span> Quit
          </li>
          <li>
            <span>Key P:</span> Pause
          </li>
        </ul>
        <button
          className="OptionsButton"
          onClick={() => {
            setOptions(false);
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Options;
