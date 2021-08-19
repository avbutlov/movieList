import React from "react";
import "./App.css";
import ColumnsContainer from "./components/ColumnsContainer/ColumnsContainer";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Switch>
      <Route path='/movies' component={ColumnsContainer}/>
      <Route path='/home' component={HomePage}/>
      <Route path='/' component={HomePage}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
