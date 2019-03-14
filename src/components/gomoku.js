import React from "react";
import { checkWin } from "../lib";
import "./game.scss";

const /**
   * 五子棋行数
   */
  ROW_COUNT = 15,
  /**
   * 五子棋列数
   */
  COL_COUNT = 15,
  /**
   * 值对应的显示文本
   */
  VALUE_TEXT = {
    0: "",
    1: "O",
    2: "X"
  };

/**
 * 创建原始数据
 */
function crateGridArr(row, col) {
  let outData = [],
    rowData = [];

  for (let i = 0; i < col; i++) {
    rowData.push(0);
  }
  for (let i = 0; i < row; i++) {
    outData.push(rowData.concat());
  }

  return outData;
}

// 栈，只存放设定长度的数据
class StepStack {
  constructor(maxLength) {
    this.maxLength = maxLength;
    this.stack = [];
  }

  push(item) {
    if (this.stack.length > this.maxLength) {
      this.shift();
    }
    this.stack.push(item);
  }

  shift() {
    if (this.stack.length > 0) {
      this.stack.shift();
    }
  }

  rollback(index) {
    let outData = this.stack.splice(index);
    return outData;
  }

  stacks() {
    return this.stack.concat();
  }

  reset() {
    this.stack = [];
  }
}

/**
 * 棋子单元格
 */
function Square(props) {
  return (
    <label
      className={`square ${props.active ? "active" : ""}`}
      datarow={props.row}
      datacol={props.col}
    >
      {VALUE_TEXT[props.value]}
    </label>
  );
}

/**
 * 每一步的button
 */
function Step(props) {
  return (
    <li className="step" dataindex={props.index}>{`[${
      VALUE_TEXT[props.user]
    }] Moves To [${props.coordinate}]`}</li>
  );
}

/**
 * 五子棋
 */
class Gomoku extends React.Component {
  constructor() {
    super();

    // 生成15X15的网格数据，O:1，X:2
    this.state = {
      grid: crateGridArr(ROW_COUNT, COL_COUNT),
      steps: []
    };

    this.curUser = 1;
    this.gameOver = false;
    this.result = [];
    // 只保留最近20步的记录
    this.stepStack = new StepStack(20);
    this.reSet = this.reSet.bind(this);
  }

  /**
   * 下棋
   */
  handleClick(e) {
    let target = e.target;
    if (this.gameOver || !target.getAttribute("datarow")) {
      return;
    }

    let row = +target.getAttribute("datarow"),
      col = +target.getAttribute("datacol");
    if (this.state.grid[row][col] !== 0) {
      console.log("当前单元格已被使用.");
      return;
    }

    let data = this.state.grid.concat();
    data[row][col] = this.curUser;
    this.addStack(row, col, this.curUser);

    let result = checkWin(data, row, col);

    this.setStaticState(result);

    this.setState({
      grid: data,
      steps: this.stepStack.stacks()
    });
  }

  setCurUser(user) {
    if (user) {
      this.curUser = user;
      return;
    }
    this.curUser = this.curUser === 1 ? 2 : 1;
  }

  setStaticState(result, user) {
    this.result = [];
    if (result && result.length === 5) {
      this.gameOver = true;
      result.forEach(item => {
        this.result.push(`${item.x}-${item.y}`);
      });
    } else {
      this.gameOver = false;
    }
    this.setCurUser(user);
  }

  /**
   * 添加记录
   */
  addStack(x, y, user) {
    this.stepStack.push({
      x,
      y,
      user
    });
  }

  /**
   * 悔棋
   */
  rollback(e) {
    if (e.target.className !== "step") {
      return;
    }

    let target = e.target,
      index = +target.getAttribute("dataindex");

    let rollData = this.stepStack.rollback(index + 1);
    if (rollData.length === 0) {
      return;
    }

    let data = this.state.grid.concat();
    rollData.forEach(item => {
      data[item.x][item.y] = 0;
    });

    this.setStaticState([], rollData[0].user);

    this.setState({
      grid: data,
      steps: this.stepStack.stacks()
    });
  }

  reSet() {
    this.setStaticState([], 1);
    this.stepStack.reset();
    this.setState({
      grid: crateGridArr(ROW_COUNT, COL_COUNT),
      steps: []
    });
  }

  render() {
    let text = this.gameOver
      ? `Winner: ${VALUE_TEXT[this.curUser === 1 ? 2 : 1]}`
      : `Next Player: ${VALUE_TEXT[this.curUser]}`;

    return (
      <div className="gomoku-box" onClick={e => this.handleClick(e)}>
        <div className="gomoku-bar">
          <button onClick={this.reSet}>Restart</button>
          <label>{text}</label>
        </div>

        <div className="game-box">
          <div className="square-box">
            {this.state.grid.map((row, i) => {
              return (
                <div key={i} className="square-row">
                  {row.map((cell, j) => {
                    let key = `${i}-${j}`;
                    return (
                      <Square
                        key={key}
                        active={this.gameOver && this.result.includes(key)}
                        value={cell}
                        row={i}
                        col={j}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <ul className="step-box" onClick={e => this.rollback(e)}>
            {this.state.steps.map((step, i) => {
              let coordinate = `${step.x},${step.y}`;
              return (
                <Step
                  key={coordinate}
                  index={i}
                  coordinate={coordinate}
                  user={step.user}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Gomoku;
