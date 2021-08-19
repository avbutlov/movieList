import React from "react";
import "./App.css";
import ColumnsContainer from "../ColumnsContainer/ColumnsContainer";
import Header from "../Header/Header";
import {Switch, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
      <Route path='/movies' component={ColumnsContainer}/>
      <Route path='/home' component={HomePage}/>
      <Route path='/' component={HomePage}/>
      </Switch>
    </div>
  );
}

export default App;
