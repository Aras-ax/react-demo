import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, IndexRoute } from "react-router";
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
                  Article
                </Link>
              </li>
              <li>
                <Link className="flex" to="/Game" activeClassName="active">
                  Game Center
                </Link>
              </li>
              <li>
                <Link className="flex" to="/product" activeClassName="active">
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <div className="content"> {this.props.children} </div>
        <footer className="footer">
          Copyright© 2019{" "}
          <a href="https://github.com/moshang-xc" target="github">
            Moshang
          </a>
        </footer>
      </>
    );
  }
}

function About() {
  return (
    <div>
      <h2>Moshang</h2>
    </div>
  );
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={About} />
      <Route path="article" component={Article} />
      <Route path="game" component={Game} />
      <Route path="product" component={Product} />
    </Route>
  </Router>,
  document.getElementById("root")
);
