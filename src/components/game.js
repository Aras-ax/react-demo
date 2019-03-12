import React from "react";
import "./game.css";

function Square(props) {
  return (
    <button
      className={(props.active ? "red " : "") + "square"}
      onClick={() => props.onClick()}
    >
      {props.value}{" "}
    </button>
  );
}

function Step(props) {
  return (
    <button className="step" onClick={() => props.onClick(props.index)}>
      {" "}
      {props.value}{" "}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let list = this.props.list;
    return (
      <Square
        key={i}
        active={this.props.line.includes(i)}
        onClick={() => {
          this.props.onClick(i);
        }}
        value={list[i]}
      />
    );
  }
  render() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(i * 3 + j));
      }
      rows.push(
        <div key={i} className="squareRow">
          {" "}
          {row}{" "}
        </div>
      );
    }
    return <div className="squareBox"> {rows} </div>;
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          list: Array(9).fill(null),
          desc: "Game Start"
        }
      ],
      curStep: 0
    };
    this.user = ["X", "O"];
    this.success = false;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    if (this.state.curStep >= 9 || this.success) {
      return;
    }
    let list = this.state.history[this.state.curStep]["list"].slice();
    if (list[i]) {
      return;
    }

    let user = this.user[this.state.curStep % 2];
    list[i] = user;
    let history = this.state.history.slice();
    history.push({
      list,
      desc: `${user} Moves To ${i + 1}`
    });

    this.setState((prevState, props) => ({
      history,
      curStep: prevState.curStep + 1
    }));
  }

  rollBack(i) {
    let history = this.state.history.slice(0, i + 1);
    this.setState({
      history,
      curStep: i
    });
    this.success = false;
  }

  componentDidUpdate() {
    if (this.success) {
      setTimeout(() => alert("游戏结束!"), 0);
    }
  }

  render() {
    let status = "",
      step = this.state.history[this.state.curStep];
    let res = calculateWinner(step.list);

    if (res.winner) {
      status = `Winner: ${res.winner}`;
      this.success = true;
    } else {
      status = `Next player: ${this.user[this.state.curStep % 2]}`;
    }

    return (
      <div className="game">
        <Board onClick={this.handleClick} list={step.list} line={res.line} />{" "}
        <div className="gameRight">
          <div> {status} </div>{" "}
          <div>
            {" "}
            {this.state.history.map((item, i) => {
              return (
                <Step
                  key={i}
                  value={item.desc}
                  onClick={i => this.rollBack(i)}
                  index={i}
                />
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

export default Game;
