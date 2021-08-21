import React from "react";
import "./App.css";
import ColumnsContainer from "../ColumnsContainer/ColumnsContainer";
import Header from "../Header/Header";
import { Route, Redirect } from "react-router-dom";
import HomePage from "../HomePage/HomePage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Route path="/movies" component={ColumnsContainer} />
      <Route path="/home" component={HomePage} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </div>
  );
}

export default App;
