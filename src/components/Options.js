import React from "react";

const Options = ({ setOptions }) => {
  return (
    <>
      <div className="OptionsContainer">
        <div className="OptionsHeader">
          <h1>Game Controls</h1>
        </div>
        <div className="OptionsDescription">
          This game works off a hidden input that is autofocused to obtain game
          controls. If for some reason you lose focus and controls, click the
          game window, and hit tab. It will re-focus the hidden input and game
          controller will once again be functional.
        </div>
        <ul className="OptionsList">
          <li>
            <span>Arrow Up:</span> Rotate
          </li>
          <li>
            <span>Arrow Left:</span> Move Left
          </li>
          <li>
            <span>Arrow Right:</span> Move Right
          </li>
          <li>
            <span>Arrow Down:</span> Slow Drop
          </li>
          <li>
            <span>Space:</span> Fast Drop
          </li>
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
