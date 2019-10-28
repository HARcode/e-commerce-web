import React from "react";
import {} from "react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
import ListItem from "./containers/ListItem";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <div
        className="container"
        style={{ marginTop: "10vh", marginBottom: "10vh", height: "80vh" }}
      >
        <ListItem />
      </div>
    </Provider>
  );
}

export default App;
