import React from "react";
import { Link } from "react-router";

import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <ul>
            <li>
              <Link to="/zhihu">ZhiHu</Link>
            </li>
            <li>
              <Link to="/Game">Game</Link>
            </li>
            <li>
              <Link to="/product">GoodsList</Link>
            </li>
          </ul>
        </header>
        <div>{this.props.children}</div>
        <footer>this is footer </footer>
      </div>
    );
  }
}

export default App;
