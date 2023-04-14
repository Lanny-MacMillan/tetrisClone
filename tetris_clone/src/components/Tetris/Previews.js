import React from "react";

import Preview from "./Preview";

const Previews = ({ tetrominoes }) => {
  // We want everything except the one the player is using, the last one
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();
  console.log("previewTetrominoes", previewTetrominoes);
  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);
