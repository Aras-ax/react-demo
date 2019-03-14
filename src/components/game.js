import React from "react";
import TicTacToe from "./ticTacToe";
import Gomoku from "./gomoku";
import "./game.scss";

function Game(props) {
  return (
    <div className="game-box">
      <div className="game-left">
        <Gomoku />
      </div>
      <div className="game-right">
        <TicTacToe />
      </div>
    </div>
  );
}

export default Game;
