import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory } from "react-router";
import Article from "./components/article";
import Game from "./components/game";
import Product from "./components/search";
import "./index.scss";

class App extends React.Component {
  render() {
    return (
      <>
        <header className="header">
          <div className="header-wrap flex">
            <a className="logo" href="/">
              React
            </a>
            <ul className="nav flex">
              <li>
                <Link className="flex" to="/article" activeClassName="active">
                  ZhiHu
                </Link>
              </li>
              <li>
                <Link className="flex" to="/Game" activeClassName="active">
                  Game
                </Link>
              </li>
              <li>
                <Link className="flex" to="/product" activeClassName="active">
                  GoodsList
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <div className="content"> {this.props.children} </div>
        <footer className="footer">
          Copyright© 2019
          <a href="https://github.com/moshang-xc" target="github">
            Moshang
          </a>
        </footer>
      </>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="article" component={Article} />
      <Route path="game" component={Game} />
      <Route path="product" component={Product} />
    </Route>
  </Router>,
  document.getElementById("root")
);
