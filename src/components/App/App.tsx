import React from "react";
import styles from "./App.module.css";
import ColumnsContainer from "../ColumnsContainer/ColumnsContainer";
import Header from "../Header/Header";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Notification from "../Notification/Notification";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Switch>
        <Route path="/movies" component={ColumnsContainer} />
        <Route path="/home" component={HomePage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path='/'>
          <Notification text='Sorry, this URL is not available'/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
