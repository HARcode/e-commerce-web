import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./configureStore";
import ListItem from "./containers/ListItem";
import AddItem from "./containers/addItem";
import Detail from "./containers/detail";

const routing = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router history={history}>
        <Route exact path="/" component={ListItem} />
        <Route path="/add" component={AddItem} />
        <Route path="/detail" component={Detail} />
      </Router>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
