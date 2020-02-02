import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";

import ComicList from "./comics/ComicList";
import ComicShow from "./comics/ComicShow";
import ComicFavorites from "./comics/ComicFavorites";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import history from "../history";
import "./App.css";
import { authenticate } from "../actions/auth";

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if(token && userId){
      dispatch(authenticate(userId, token))
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Router history={history}>
        <Header className="header" />
        <div className="content-container">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/comics/:id" exact component={ComicShow} />
            <Route path="/favorite" exact component={ComicFavorites} />
            <Route path="/:page?" exact component={ComicList} />
          </Switch>
        </div>
        <Footer className="footer" />
      </Router>
    </div>
  );
};

export default App;
