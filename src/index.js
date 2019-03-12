import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import App from "./app";
import Zhihu from "./components/zhihu";
import Game from "./components/game";
import Product from "./components/search";
import "./index.css";

let data = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

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

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="zhihu" component={Zhihu} />
      <Route path="game" component={Game} />
      <Route path="product" component={Product} />
    </Route>
  </Router>,
  document.getElementById("root")
);
